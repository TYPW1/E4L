package lu.uni.e4l.platform.i18n.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lu.uni.e4l.platform.Main;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class Localizer {

    private static ResourceBundleMessageSource messageSource;

    @Autowired
    public Localizer(ResourceBundleMessageSource messageSource) {
        Localizer.messageSource = messageSource;
    }

    public static String toLocale(String msgCode) {
        return toLocale(msgCode, LocaleContextHolder.getLocale());
    }

    public static String toLocale(String msgCode, Locale locale) {
        if (msgCode == null)
            return null;

        return messageSource.getMessage(msgCode.trim(), null, locale);
    }

    public static void localizeObject(Object obj) {
        final Locale locale = LocaleContextHolder.getLocale();
        modifyObject(obj, Main.class.getPackage().getName(), String.class, 10, (msg) -> toLocale(msg, locale));
    }

    /**
     * Method goes through the object @param obj and all its nested objects in package @param basePackage,
     * finds fields with public getter and setter of type @param targetClass and calls setter of that field
     * with the value from getter applied to the function @param modifyFunction
     *
     * @param obj            target object to be translated
     * @param basePackage    base package of objects to be modified
     * @param targetClass    target class of field to be modified
     * @param maxDepth       maximum recursion depth for nested objects
     * @param modifyFunction function applied for field modification
     * @param <T>            type of target class @param targetClass
     */
    @SuppressWarnings("unchecked")
    public static <T> void modifyObject(Object obj,
                                        String basePackage,
                                        Class<T> targetClass,
                                        int maxDepth,
                                        Function<T, T> modifyFunction) {
        if (obj == null || maxDepth < 0) {
            return;
        }

        // modify list objects
        if (List.class.isAssignableFrom(obj.getClass())) {
            List list = (List) obj;
            for (int i = 0; i < list.size(); i++) {
                Object el = list.get(i);
                if (targetClass.isAssignableFrom(el.getClass()))
                    listSafeSet(list, i, modifyFunction.apply((T) el));
                else
                    modifyObject(el, basePackage, targetClass, maxDepth - 1, modifyFunction);
            }
            return;
        }

        //modify set objects
        if (Set.class.isAssignableFrom(obj.getClass())) {
            List<?> elements = ((Set<?>) obj).stream()
                    .filter(el -> targetClass.isAssignableFrom(el.getClass()))
                    .collect(Collectors.toList());

            elements.forEach(el -> setSafeReplace((Set) obj, el, modifyFunction.apply((T) el)));
        }

        // modify all objects in a collection
        if (Iterable.class.isAssignableFrom(obj.getClass())) {
            ((Iterable<?>) obj).forEach((el) -> modifyObject(el, basePackage, targetClass, maxDepth - 1, modifyFunction));
        }

        // modify dictionaries
        if (Map.class.isAssignableFrom(obj.getClass())) {
            ((Map) obj).forEach((k, v) -> {
                if (targetClass.isAssignableFrom(v.getClass()))
                    ((Map) obj).put(k, modifyFunction.apply((T) v));
                else
                    modifyObject(v, basePackage, targetClass, maxDepth - 1, modifyFunction);
            });
        }

        if (!obj.getClass().getPackage().getName().startsWith(basePackage)) {
            return;
        }

        List<Method> getters = Arrays.stream(obj.getClass().getMethods())
                .filter(m -> m.getName().startsWith("get") && m.getParameterCount() == 0
                        && Modifier.isPublic(m.getModifiers()))
                .collect(Collectors.toList());

        // find fields to modify in current object
        getters.stream()
                .filter(m -> targetClass.isAssignableFrom(m.getReturnType()))
                .map(m -> new GetterSetterContainer(m, getPublicMethod(obj, "set" + m.getName().substring(3), targetClass)))
                .filter(pair -> pair.getSetter() != null) // filter out getters with no setter
                .forEach(pair -> safeInvokeMethod(pair.getSetter(), obj, modifyFunction.apply((T) safeInvokeMethod(pair.getGetter(), obj))));

        // recursively modify nested objects
        getters.stream()
                .filter(m -> m.getReturnType().getPackage() != null)
                .filter(m -> Iterable.class.isAssignableFrom(m.getReturnType())
                        || Map.class.isAssignableFrom(m.getReturnType())
                        || m.getReturnType().getPackage().getName().startsWith(basePackage))
                .forEach(m -> modifyObject(safeInvokeMethod(m, obj), basePackage, targetClass, maxDepth - 1, modifyFunction));
    }

    @SuppressWarnings("unchecked")
    private static void setSafeReplace(Set set, Object original, Object target) {
        try {
            set.remove(original);
            set.add(target);
        } catch (Throwable ignore) {
        }
    }

    @SuppressWarnings("unchecked")
    private static void listSafeSet(List list, int index, Object el) {
        try {
            list.set(index, el);
        } catch (Throwable ignore) {
        }
    }

    private static Method getPublicMethod(Object obj, String methodName, Class<?>... argsTypes) {
        return Arrays.stream(obj.getClass().getMethods())
                .filter(m -> m.getName().equals(methodName))
                .filter(m -> Modifier.isPublic(m.getModifiers()))
                .filter(m -> Arrays.equals(argsTypes, m.getParameterTypes()))
                .findAny().orElse(null);
    }

    private static Object safeInvokeMethod(Method method, Object target, Object... args) {
        try {
            return method.invoke(target, args);
        } catch (Throwable throwable) {
            return null;
        }
    }

    @Data
    @AllArgsConstructor
    private static class GetterSetterContainer {
        private Method getter;
        private Method setter;
    }
}

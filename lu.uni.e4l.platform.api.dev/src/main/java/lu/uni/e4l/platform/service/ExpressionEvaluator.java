package lu.uni.e4l.platform.service;

import lombok.AllArgsConstructor;
import lu.uni.e4l.platform.model.VariableValue;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class ExpressionEvaluator {

    private static Map<String, Operator> operators = new HashMap<>();

    static {
        operators.put("sin", new Operator("sin", 6, 1, (x) -> Math.sin(x.get(0))));
        operators.put("abs", new Operator("abs", 6, 1, (x) -> Math.abs(x.get(0))));
        operators.put("floor", new Operator("floor", 6, 1, (x) -> Math.floor(x.get(0))));
        operators.put("ceil", new Operator("ceil", 6, 1, (x) -> Math.ceil(x.get(0))));
        operators.put("round", new Operator("round", 6, 1, (x) -> (double) Math.round(x.get(0))));
        operators.put("/", new Operator("/", 5, 2, (x) -> x.get(0) / x.get(1)));
        operators.put("*", new Operator("*", 5, 2, (x) -> x.get(0) * x.get(1)));
        operators.put("+", new Operator("+", 4, 2, (x) -> x.get(0) + x.get(1)));
        operators.put("-", new Operator("-", 4, 2, (x) -> x.get(0) - x.get(1)));
        operators.put("(", new Operator("(", 0, 0, null));
        operators.put(")", new Operator(")", 0, 0, null));
    }

    public static List<String> tokenize(String expr) {
        expr = expr.replaceAll("\\(", " ( ");
        expr = expr.replaceAll("\\)", " ) ");
        return Arrays.stream(expr.split("\\s"))
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }

    public static List<String> replaceVariablesWithValues(List<String> tokens, Map<String, String> values) {
        return tokens.stream()
                .map((t) -> {
                    if (isNumber(t))
                        return t;
                    else if (operators.containsKey(t))
                        return t;
                    else if (values.containsKey(t))
                        return values.get(t);
                    else
                        throw new InvalidExpressionException("invalid token " + t);
                })
                .collect(Collectors.toList());
    }

    private static boolean isNumber(String s) {
        if (s == null || s.isEmpty())
            return false;

        if (s.startsWith("-") && s.length() > 1)
            s = s.substring(1);

        return !s.chars()
                .filter((c) -> !Character.isDigit(c) && c != '.')
                .findAny().isPresent();
    }

    public static Queue<String> toReverePolishNotation(List<String> tokens) {

        if (!checkParenthesis(tokens))
            throw new InvalidExpressionException("expression has invalid parenthesis");

        Queue<String> rpn = new LinkedList<>();
        Stack<String> operatorsBuffer = new Stack<>();

        for (String token : tokens) {
            if ("(".equals(token)) {
                operatorsBuffer.push(token);
                continue;
            }

            if (")".equals(token)) {
                while (!"(".equals(operatorsBuffer.peek()) || ",".equals(operatorsBuffer.peek())) {
                    rpn.add(operatorsBuffer.pop());
                }
                operatorsBuffer.pop();
                continue;
            }

            if (operators.containsKey(token)) {
                while (!operatorsBuffer.isEmpty()
                        && operators.get(token).precedence <= operators.get(operatorsBuffer.peek()).precedence) {
                    rpn.add(operatorsBuffer.pop());
                }
                operatorsBuffer.push(token);
                continue;
            }

            if (isNumber(token)) {
                rpn.add(token);
                continue;
            }

            throw new InvalidExpressionException("invalid token " + token);
        }

        while (!operatorsBuffer.isEmpty()) {
            rpn.add(operatorsBuffer.pop());
        }

        return rpn;
    }

    public static Double evaluate(Queue<String> rpn) {
        Stack<Double> numbers = new Stack<>();

        for (String token : rpn) {
            if (isNumber(token))
                numbers.push(Double.parseDouble(token));
            else {
                Operator operator = operators.get(token);

                if (numbers.size() < operator.argumentsNumber)
                    throw new InvalidExpressionException("invalid number of arguments for the operator (not enough)");

                List<Double> args = new ArrayList<>();
                for (int i = 0; i < operator.argumentsNumber; i++) {
                    args.add(numbers.pop());
                }
                Collections.reverse(args);
                numbers.push(operator.function.apply(args));
            }
        }

        if (numbers.size() != 1)
            throw new InvalidExpressionException("invalid number of arguments for the operator (some not used)");

        return numbers.pop();
    }

    private static boolean checkParenthesis(List<String> tokens) {
        long count = 0;

        for (String token : tokens) {
            if ("(".equals(token))
                count++;
            else if (")".equals(token)) {
                count--;
                if (count < 0)
                    return false;
            }
        }

        return count == 0;
    }

    public static Double evaluate(String expr, Collection<VariableValue> variables) {
        Map<String, String> vars = variables.stream()
                .collect(Collectors.toMap(v -> v.getVariable().getName(), v -> String.valueOf(v.getValue())));

        return evaluate(expr, vars);
    }

    public static Double evaluate(String expr, Map<String, String> variables) {
        return evaluate(toReverePolishNotation(replaceVariablesWithValues(tokenize(expr), variables)));
    }

    @AllArgsConstructor
    private static class Operator {
        private String sign;
        private int precedence;
        private int argumentsNumber;
        private Function<List<Double>, Double> function;
    }

    protected static class InvalidExpressionException extends RuntimeException {
        public InvalidExpressionException(String msg) {
            super(msg);
        }
    }
}

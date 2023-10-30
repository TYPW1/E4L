package lu.uni.e4l.platform.service.crypto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

@Service
public class SignedObjectSerializer {

    private static final String SIGNATURE_ALGORITHM = "HMACSHA1";

    private static String signatureKey="GvZ8VwGr_e";

    public static String serializeWithSignature(Object obj) {
        byte[] serializedObject = serialize(obj);
        byte[] objectSignature = sign(serializedObject, getKey());

        return bytesAsString(serializedObject) + "." + bytesAsString(objectSignature);
    }

    public static  <T> T deserialize(String data, Class<T> target) {
        String[] tokens = data.split("\\.");

        if (tokens.length != 2)
            throw new InvalidSignedObjectException("Cannot deserialize invalid signed object");

        byte[] serializedObject = stringAsBytes(tokens[0]);
        byte[] objectSignature = stringAsBytes(tokens[1]);

        if (!checkSignature(serializedObject, getKey(), objectSignature))
            throw new InvalidSignedObjectException("Invalid signature");

        return deserialize(serializedObject, target);
    }

    private static byte[] getKey() {
        return signatureKey.getBytes(StandardCharsets.UTF_8);
    }

    @SneakyThrows
    private static byte[] serialize(Object obj) {
        return new ObjectMapper().writeValueAsBytes(obj);
    }

    @SneakyThrows
    private static  <T> T deserialize(byte[] data, Class<T> target) {
        return new ObjectMapper().readValue(data, target);
    }

    @SneakyThrows
    private static byte[] sign(byte[] data, byte[] key) {
        Mac mac = Mac.getInstance(SIGNATURE_ALGORITHM);
        mac.init(new SecretKeySpec(key, SIGNATURE_ALGORITHM));

        return mac.doFinal(data);
    }

    private static boolean checkSignature(byte[] data, byte[] key, byte[] signature) {
        return Arrays.equals(signature, sign(data, key));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    private static class InvalidSignedObjectException extends RuntimeException {
        private InvalidSignedObjectException(String msg) {
            super(msg);
        }
    }

    private static byte[] stringAsBytes(String str) {
        return Base64.getUrlDecoder()
                .decode(str);
    }

    private static String bytesAsString(byte[] bytes) {
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }

}


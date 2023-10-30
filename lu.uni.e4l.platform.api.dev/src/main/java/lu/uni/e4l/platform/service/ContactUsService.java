package lu.uni.e4l.platform.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lu.uni.e4l.platform.model.dto.ContactUs;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.text.MessageFormat;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactUsService {
    private final JavaMailSender emailSender;

    @Value("${e4l.contact.from}")
    private String emailFrom;

    @Value("${e4l.contact.email}")
    private String contactEmail;

    public void onNewMessage(ContactUs message, String lang, HttpServletRequest request) {
        lang = lang.trim().toLowerCase();
        lang = Arrays.asList("en", "fr", "de", "lu").contains(lang) ? lang : "en";

        SimpleMailMessage forwardedMail = forwardUserMessage(message, lang, request);
        SimpleMailMessage confirmationMail = sendReceiveConfirmation(message.getEmail(), message.getFirstName(),
                message.getLastName(), lang);

        log.info("Successfully forwarded message from {}", message.getEmail());
    }

    @SneakyThrows
    private SimpleMailMessage forwardUserMessage(ContactUs message, String lang, HttpServletRequest req) {
        String userAgent = req.getHeader("User-Agent");

        String resourcePath = "/email/contact/forward_message.txt";
        String template = IOUtils.toString(this.getClass().getResourceAsStream(resourcePath), StandardCharsets.UTF_8);
        String text = MessageFormat.format(
                template,
                message.getFirstName(),
                message.getLastName(),
                message.getEmail(),
                message.getSubject(),
                message.getMessage()
        );

        return sendEmail(contactEmail, message.getEmail(), "[E4L Contact Form] " + message.getSubject(), text);
    }

    @SneakyThrows
    private SimpleMailMessage sendReceiveConfirmation(String email, String firstName, String lastName, String lang) {
        String resourcePath = "/email/contact/receive_confirmation_" + lang + ".txt";
        String template = IOUtils.toString(this.getClass().getResourceAsStream(resourcePath), StandardCharsets.UTF_8);
        String text = MessageFormat.format(template, firstName, lastName);

        return sendEmail(email, contactEmail, "Energy4Life", text);
    }

    private SimpleMailMessage sendEmail(String email, String replyTo, String subject, String text) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(emailFrom);
        mail.setReplyTo(replyTo);
        mail.setTo(email.split(","));
        mail.setSubject(subject);
        mail.setText(text);

        emailSender.send(mail);
        return mail;
    }
}

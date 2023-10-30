package lu.uni.e4l.platform.controller;

import lombok.RequiredArgsConstructor;
import lu.uni.e4l.platform.model.dto.ContactUs;
import lu.uni.e4l.platform.service.ContactUsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class ContactUsController {
    private final ContactUsService contactUsService;


    @PostMapping("/contact")
    public ResponseEntity<?> contactUs(@RequestHeader("accept-language") String lang,
                                       @RequestBody ContactUs contactUs,
                                       HttpServletRequest request) {
        contactUsService.onNewMessage(contactUs, lang, request);
        return ResponseEntity.ok().build();
    }
}

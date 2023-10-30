package lu.uni.e4l.platform.controller;

import lu.uni.e4l.platform.model.*;
import lu.uni.e4l.platform.model.dto.ResultBreakdown;
import lu.uni.e4l.platform.service.QuestionnaireService;
import lu.uni.e4l.platform.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;
    private final SessionService sessionService;

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService,
                                   SessionService sessionService) {
        this.questionnaireService = questionnaireService;
        this.sessionService = sessionService;
    }

    @GetMapping("/questionnaire")
    public List<Question> getPoll() {
        List<Question> questions = questionnaireService.getDefaultQuestionnaire().getQuestions();

        // avoiding loops on serialization
        for (Question question : questions) {
            for (PossibleAnswer possibleAnswer : question.getPossibleAnswers()) {
                possibleAnswer.setAnswers(null);
                possibleAnswer.setQuestion(null);
            }
        }

        return questions;
    }

    @GetMapping("/responses/count")
    public int allResponsesCount() {
        return sessionService.getSessions().size();
    }

    @GetMapping("/responses")
    @PreAuthorize("isAuthenticated()")
    public List<ResultBreakdown> getResponses(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return sessionService.getSessions().stream()
                .filter(q -> user.getRoles().contains(UserRole.ADMIN) || user.getId() == q.getUser().getId())
                .map(ResultBreakdown::fromSession)
                .collect(Collectors.toList());
    }
}

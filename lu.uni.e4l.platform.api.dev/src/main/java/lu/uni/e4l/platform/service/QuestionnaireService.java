package lu.uni.e4l.platform.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import lu.uni.e4l.platform.exception.NotFoundException;
import lu.uni.e4l.platform.model.PossibleAnswer;
import lu.uni.e4l.platform.model.Question;
import lu.uni.e4l.platform.model.Questionnaire;
import lu.uni.e4l.platform.model.Session;
import lu.uni.e4l.platform.repository.QuestionnaireRepository;
import lu.uni.e4l.platform.repository.SessionRepository;
import lu.uni.e4l.platform.service.crypto.SignedObjectSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;

@Service
public class QuestionnaireService {

    private static final String DEFAULT_QUESTIONNAIRE = "energy4life";

    @Value("${resources.static.url}")
    private String staticResourcesUrl;

    private final QuestionnaireRepository questionnaireRepository;

    public QuestionnaireService(QuestionnaireRepository questionnaireRepository) {
        this.questionnaireRepository = questionnaireRepository;
    }

    public Questionnaire getDefaultQuestionnaire() {
        return questionnaireRepository.findByName(DEFAULT_QUESTIONNAIRE);
    }

    @PostConstruct
    private void loadPoll() {
        try {
            if (questionnaireRepository.findByName(DEFAULT_QUESTIONNAIRE) != null)
                return;

            ObjectMapper objectMapper = new ObjectMapper(new YAMLFactory());
            List<Question> questions = objectMapper.readValue(
                    QuestionnaireService.class.getResourceAsStream("/poll.yml"),
                    new TypeReference<List<Question>>() {
                    });

            for (Question question : questions) {
                for (PossibleAnswer possibleAnswer : question.getPossibleAnswers()) {
                    possibleAnswer.setQuestion(question);
                }
            }

            for (Question question : questions) {
                if (question.getDetailsFile() != null)
                    question.setDetailsFile(staticResourcesUrl + question.getDetailsFile());
                for (PossibleAnswer possibleAnswer : question.getPossibleAnswers()) {
                    possibleAnswer.setImage(staticResourcesUrl + possibleAnswer.getImage());
                }
            }

            questionnaireRepository.save(new Questionnaire(DEFAULT_QUESTIONNAIRE, questions));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

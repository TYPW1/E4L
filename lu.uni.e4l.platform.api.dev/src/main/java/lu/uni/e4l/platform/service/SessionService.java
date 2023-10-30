package lu.uni.e4l.platform.service;

import lu.uni.e4l.platform.exception.BadRequestException;
import lu.uni.e4l.platform.exception.NotFoundException;
import lu.uni.e4l.platform.model.*;
import lu.uni.e4l.platform.repository.PossibleAnswerRepository;
import lu.uni.e4l.platform.repository.SessionRepository;
import lu.uni.e4l.platform.repository.VariableRepository;
import lu.uni.e4l.platform.service.crypto.SignedObjectSerializer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SessionService {
        
    private final VariableRepository variableRepository;
    private final SessionRepository sessionRepository;
    private final PossibleAnswerRepository possibleAnswerRepository;
    private final QuestionnaireService questionnaireService;
    private final UserManagementService userManagementService;
    private final SeminarService seminarService;

    public SessionService(VariableRepository variableRepository,
                          SessionRepository sessionRepository,
                          PossibleAnswerRepository possibleAnswerRepository,
                          QuestionnaireService questionnaireService,
                          UserManagementService userManagementService,
                          SeminarService seminarService) {
        this.variableRepository = variableRepository;
        this.sessionRepository = sessionRepository;
        this.possibleAnswerRepository = possibleAnswerRepository;
        this.questionnaireService = questionnaireService;
        this.userManagementService = userManagementService;
        this.seminarService = seminarService;
    }

    public List<Session> getSessions() {
        return StreamSupport.stream(sessionRepository.findAll().spliterator(), true)
                .sorted(Comparator.comparing(Session::getDateTime).reversed())
                .collect(Collectors.toList());
    }

    public List<Session> getSessions(List<Long> sessionIdList) {
        List<Long> sessionIdSet = sessionIdList.stream().collect(Collectors.toList());

        return StreamSupport.stream(sessionRepository.findAll().spliterator(), true)
                .filter(session -> sessionIdSet.contains(session.getId()))
                .sorted(Comparator.comparing(Session::getDateTime).reversed())
                .collect(Collectors.toList());
    }

    // public List<Session> getSessions(List<String> signedSessionIdList) {
    //     List<Long> sessionIdSet = sessionIdList.stream()
    //         .map(e -> SignedObjectSerializer.deserialize(e, Long.class))
    //         .collect(Collectors.toSet());

    //     return StreamSupport.stream(sessionRepository.findAll().spliterator(), true)
    //             .filter(session -> sessionIdSet.contains(session.getId()))
    //             .sorted(Comparator.comparing(Session::getDateTime).reversed())
    //             .collect(Collectors.toList());
    // }

    public Session getSession(long id) {
        return sessionRepository.findById(id).orElse(null);
    }

    public Session getSession(String signedSessionId) {
        return sessionRepository.findById(SignedObjectSerializer.deserialize(signedSessionId, Long.class))
                .orElseThrow(() -> new NotFoundException("Session not found"));
    }

    public Session updateSession(Session session){
        if (session == null)
            throw new InvalidQuestionnaireException("Session not found");
        if (session.getAnswers() == null)
            throw new InvalidQuestionnaireException("Session should contain 'answers' array");
        Questionnaire defaultQuestionnaire = questionnaireService.getDefaultQuestionnaire();
        User anonymousUser = userManagementService.getCurrentUser();

        session.setDateTime(ZonedDateTime.now());
        session.setQuestionnaire(defaultQuestionnaire);
        session.setUser(anonymousUser);
        Map<Long, List<Answer>> questionIdToAnswers = new HashMap<>();

        for (Answer answer : session.getAnswers()) {

            answer.setPossibleAnswer(possibleAnswerRepository.findById(answer.getPossibleAnswer().getId())
                    .orElseThrow(() -> new InvalidQuestionnaireException("Possible answer id=" +
                            answer.getPossibleAnswer().getId() + " was not found")));

            Set<Long> allowedVariableIds = answer.getPossibleAnswer().getVariables().stream()
                    .map(Variable::getId)
                    .collect(Collectors.toSet());

            answer.setSession(session);

            questionIdToAnswers.putIfAbsent(answer.getPossibleAnswer().getQuestion().getId(), new ArrayList<>());
            questionIdToAnswers.get(answer.getPossibleAnswer().getQuestion().getId()).add(answer);

            if (answer.getVariableValues() == null)
                answer.setVariableValues(new ArrayList<>());

            for (VariableValue variableValue : answer.getVariableValues()) {
                if (!allowedVariableIds.remove(variableValue.getVariable().getId()))
                    throw new InvalidQuestionnaireException("Possible answer id=" + answer.getPossibleAnswer().getId() +
                            " doesn't have a variable id=" + variableValue.getVariable().getId() + " or this variable is set twice");

                variableValue.setVariable(variableRepository.findById(variableValue.getVariable().getId()).get());

                if (!variableValue.getVariable().getScale().isValidInput(variableValue.getValue()))
                    throw new InvalidQuestionnaireException("Variable value (" + variableValue.getValue() +
                            ") is invalid (variable id = " + variableValue.getVariable().getId() + ")");
            }

            if (!allowedVariableIds.isEmpty())
                throw new InvalidQuestionnaireException("Possible answer id=" + answer.getPossibleAnswer().getId() +
                        " has variables without a value (var ids=" + allowedVariableIds + ")");
        }

        return session;
    }

    public String saveSession(Session session) {
        return saveSessionGlobal(session, "");
    }
    public String saveSession(Session session, String seminarAccessCode) {
        return saveSessionGlobal(session, seminarAccessCode);
    }
    private String saveSessionGlobal(Session session, String seminarAccessCode) {

        if(!seminarAccessCode.isEmpty()) {
            Seminar seminar = seminarService.getSeminarByAccessCode(seminarAccessCode);
            if(seminar.getStatus().equals(SeminarStatus.OPEN)){
                session.setSeminar(seminar);
            }
        }

        if (session == null)
            throw new InvalidQuestionnaireException("Session not found");

        if (session.getAnswers() == null)
            throw new InvalidQuestionnaireException("Session should contain 'answers' array");

        // check if each answer has a possible answer
        session.getAnswers().stream()
                .filter(a -> a.getPossibleAnswer() == null)
                .findAny()
                .ifPresent((a) -> {
                    throw new InvalidQuestionnaireException("Each answer should have 'possibleAnswer' object");
                });

        Questionnaire defaultQuestionnaire = questionnaireService.getDefaultQuestionnaire();
        User anonymousUser = userManagementService.getCurrentUser();

        session.setDateTime(ZonedDateTime.now());
        session.setQuestionnaire(defaultQuestionnaire);
        session.setUser(anonymousUser);

        Map<Long, List<Answer>> questionIdToAnswers = new HashMap<>();

        for (Answer answer : session.getAnswers()) {

            answer.setPossibleAnswer(possibleAnswerRepository.findById(answer.getPossibleAnswer().getId())
                    .orElseThrow(() -> new InvalidQuestionnaireException("Possible answer id=" +
                            answer.getPossibleAnswer().getId() + " was not found")));

            Set<Long> allowedVariableIds = answer.getPossibleAnswer().getVariables().stream()
                    .map(Variable::getId)
                    .collect(Collectors.toSet());

            answer.setSession(session);

            questionIdToAnswers.putIfAbsent(answer.getPossibleAnswer().getQuestion().getId(), new ArrayList<>());
            questionIdToAnswers.get(answer.getPossibleAnswer().getQuestion().getId()).add(answer);

            if (answer.getVariableValues() == null)
                answer.setVariableValues(new ArrayList<>());

            for (VariableValue variableValue : answer.getVariableValues()) {
                if (!allowedVariableIds.remove(variableValue.getVariable().getId()))
                    throw new InvalidQuestionnaireException("Possible answer id=" + answer.getPossibleAnswer().getId() +
                            " doesn't have a variable id=" + variableValue.getVariable().getId() + " or this variable is set twice");

                variableValue.setVariable(variableRepository.findById(variableValue.getVariable().getId()).get());

                if (!variableValue.getVariable().getScale().isValidInput(variableValue.getValue()))
                    throw new InvalidQuestionnaireException("Variable value (" + variableValue.getValue() +
                            ") is invalid (variable id = " + variableValue.getVariable().getId() + ")");
            }

            if (!allowedVariableIds.isEmpty())
                throw new InvalidQuestionnaireException("Possible answer id=" + answer.getPossibleAnswer().getId() +
                        " has variables without a value (var ids=" + allowedVariableIds + ")");
        }

        //check that possible answer has only one answer
        questionIdToAnswers.values().stream()
                .filter(answers -> answers.size() != answers.stream()
                        .mapToLong(a -> a.getPossibleAnswer().getId()).distinct().count())
                .findAny()
                .ifPresent(a -> {
                    throw new InvalidQuestionnaireException("More than one answer correspond to one possible answer");
                });

        //check number of answers limitations
        session.getQuestionnaire().getQuestions().forEach((q) -> {
            int answersNumber = questionIdToAnswers.containsKey(q.getId()) ? questionIdToAnswers.get(q.getId()).size() : 0;
            if (q.getMinAnswersNumber() > answersNumber || answersNumber > q.getMaxAnswersNumber())
                throw new InvalidQuestionnaireException("Question id=" + q.getId() + " has invalid number of answers: " +
                        answersNumber + " ∉ [" + q.getMinAnswersNumber() + ".." + q.getMaxAnswersNumber() + "]");
        });

        session = sessionRepository.save(session);

        return SignedObjectSerializer.serializeWithSignature(sessionRepository.save(session).getId());
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    private static class InvalidQuestionnaireException extends BadRequestException {
        public InvalidQuestionnaireException(String msg) {
            super(msg);
        }
    }
}

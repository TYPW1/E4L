package lu.uni.e4l.platform.controller;

import lu.uni.e4l.platform.model.*;
import lu.uni.e4l.platform.exception.BadRequestException;
import lu.uni.e4l.platform.model.dto.ResultBreakdown;
import lu.uni.e4l.platform.model.dto.ResultBreakdownSeminar;
import lu.uni.e4l.platform.service.CalculatorService;
import lu.uni.e4l.platform.service.QuestionnaireService;
import lu.uni.e4l.platform.service.SessionService;
import lu.uni.e4l.platform.service.SeminarService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class CalculatorController {

    private final CalculatorService calculatorService;
    private final SessionService sessionService;
    private final SeminarService seminarService;

    public CalculatorController(CalculatorService calculatorService,
                                SessionService sessionService,
                                SeminarService seminarService) {
        this.calculatorService = calculatorService;
        this.sessionService = sessionService;
        this.seminarService = seminarService;
    }

    @PostMapping("/session")
    public String saveSession(@RequestBody Session session) {
        return sessionService.saveSession(session);
    }

    @PostMapping("/session/{seminarAccessCode}")
    public String saveSession(@RequestBody Session session, @PathVariable String seminarAccessCode) {
        return sessionService.saveSession(session, seminarAccessCode);
    }

    @GetMapping("/calculate/session/{sessionId}")
    public ResultBreakdown calculate(@PathVariable String sessionId) {
        ResultBreakdown resBreakdown = calculatorService.calculate(sessionService.getSession(sessionId));
        resBreakdown.averageCalculation(sessionService.getSessions());
        resBreakdown.listOfScores(sessionService.getSessions());
        return resBreakdown;
    }
    
    @GetMapping("/calculate/seminar/{seminarAccessCode}")
    public ResultBreakdownSeminar calculateSeminar(@PathVariable String seminarAccessCode) {
        
        Seminar seminar = seminarService.getSeminarByAccessCode(seminarAccessCode);
        
        if(seminar == null) {
            throw new BadRequestException("Seminar with this access code does not exist");
        }
        else if(seminar.getStatus().equals(SeminarStatus.CLOSED)) {
            ResultBreakdownSeminar resultBreakdownSeminar = ResultBreakdownSeminar.newFromSeminar(seminar, sessionService);
            return resultBreakdownSeminar;
        } else {
            throw new BadRequestException("Seminar with this access code is not open");
        }
    }

    @PostMapping("/calculate/energyConsumption")
    public ResultBreakdown calculateEnergyConsumption(@RequestBody Session session) {
        return calculatorService.calculate(sessionService.updateSession(session));
    }

}

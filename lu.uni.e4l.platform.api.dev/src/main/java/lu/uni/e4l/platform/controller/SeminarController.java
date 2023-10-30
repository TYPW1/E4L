package lu.uni.e4l.platform.controller;

import lu.uni.e4l.platform.model.Seminar;
import lu.uni.e4l.platform.model.SeminarStatus;
import lu.uni.e4l.platform.model.dto.ResultBreakdown;
import lu.uni.e4l.platform.service.CalculatorService;
import lu.uni.e4l.platform.service.QuestionnaireService;
import lu.uni.e4l.platform.service.SeminarService;
import org.springframework.web.bind.annotation.*;
import lu.uni.e4l.platform.service.UserManagementService;
import lu.uni.e4l.platform.model.User;
import lu.uni.e4l.platform.exception.ForbiddenException;
import lu.uni.e4l.platform.model.UserRole;
import org.springframework.security.access.prepost.PreAuthorize;
import javax.validation.Valid;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class SeminarController {

    private final SeminarService seminarService;
    private final UserManagementService userManagementService;

    public SeminarController(UserManagementService userManagementService, SeminarService seminarService) {
        this.seminarService = seminarService;
        this.userManagementService = userManagementService;
    }

    @GetMapping("/seminars")
    public Map<String, SeminarStatus> getSeminars() {
        return seminarService.getSeminars();
    }

    @GetMapping("/seminarlist")
    @PreAuthorize("isAuthenticated()")
    public List<Seminar> getSeminarList() {
        if(!isAuthorized()){
            throw new ForbiddenException("You do not have permission to access this information");
        }
        return seminarService.getSeminarList();
    }

    @PostMapping("/seminar")
    @PreAuthorize("isAuthenticated()")
    public Seminar createSeminar(@RequestBody Seminar seminar) {
        if(!isAuthorized()){
            throw new ForbiddenException("You do not have permission to access this information");
        }
        return seminarService.createSeminar(seminar);
    }

    @PutMapping("/seminar/update")
    @PreAuthorize("isAuthenticated()")
    public Seminar updateSeminar(@Valid @RequestBody Seminar seminar) {
        if(!isAuthorized()){
            throw new ForbiddenException("You do not have permission to access this information");
        }
        return seminarService.updateSeminar(seminar);
    }

    @DeleteMapping("/seminar")
    @PreAuthorize("isAuthenticated()")
    public List<Seminar> deleteSeminar(@RequestBody String seminarId) {
        if(!isAuthorized()){
            throw new ForbiddenException("You do not have permission to access this information");
        }
        Long seminarIdLong = Long.parseLong(seminarId);
        seminarService.deleteSeminar(seminarIdLong);

        return seminarService.getSeminarList();
    }

    private Boolean isAuthorized() {
        User currentUser = userManagementService.getCurrentUser();
        if (currentUser.getRoles().contains(UserRole.ADMIN)) return true;
        else return false; 
    }
}

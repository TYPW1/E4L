package lu.uni.e4l.platform.service;

import lu.uni.e4l.platform.exception.BadRequestException;
import lu.uni.e4l.platform.exception.NotFoundException;
import lu.uni.e4l.platform.model.*;
import lu.uni.e4l.platform.repository.PossibleAnswerRepository;
import lu.uni.e4l.platform.repository.SessionRepository;
import lu.uni.e4l.platform.repository.VariableRepository;
import lu.uni.e4l.platform.repository.SeminarRepository;
import lu.uni.e4l.platform.service.crypto.SignedObjectSerializer;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SeminarService {
    private final SeminarRepository seminarRepository;

    public SeminarService(SeminarRepository seminarRepository) {
        this.seminarRepository = seminarRepository;
    }

    public Map<String, SeminarStatus> getSeminars() {
        Map<String, SeminarStatus> map = StreamSupport.stream(seminarRepository.findAll().spliterator(), true)
                .collect(Collectors
                .toMap(
                    a -> a.getAccessCode(), 
                    a -> a.getStatus()
                ));

        return map;
    }

    public List<Seminar> getSeminarList() {
        return StreamSupport.stream(seminarRepository.findAll().spliterator(), true)
                .sorted(Comparator.comparing(Seminar::getEventDateTime).reversed())
                .collect(Collectors.toList());
    }

    public Seminar getSeminar(long id) {
        return seminarRepository.findById(id).orElse(null);
    }

    public Seminar getSeminarByAccessCode(String accessCode) {
        return StreamSupport.stream(seminarRepository.findAll().spliterator(), true)
        .sorted(Comparator.comparing(Seminar::getEventDateTime).reversed())
            .filter(seminar -> seminar.getAccessCode().equals(accessCode))
            .findFirst().orElse(null);
    }

    public Seminar getSeminar(String signedSeminarId) {
        return seminarRepository.findById(SignedObjectSerializer.deserialize(signedSeminarId, Long.class))
                .orElseThrow(() -> new NotFoundException("Seminar not found"));
    }

    public Seminar updateSeminar(Seminar newSeminar){
        Seminar seminar = seminarRepository.findById(newSeminar.getId())
        .orElseThrow(() -> new NotFoundException("Seminar with id = " + newSeminar.getId() + " not found"));
        
        SeminarStatus previousStatus = seminar.getStatus();

        boolean canUpdate = false;

        if (previousStatus.equals(newSeminar.getStatus())) {
            canUpdate = true;
        } else if (previousStatus.equals(SeminarStatus.TODO) && (newSeminar.getStatus().equals(SeminarStatus.OPEN) || newSeminar.getStatus().equals(SeminarStatus.CANCELLED))) {
            canUpdate = true;
        } else if (previousStatus.equals(SeminarStatus.OPEN) && (newSeminar.getStatus().equals(SeminarStatus.TODO) || newSeminar.getStatus().equals(SeminarStatus.CLOSED))) {
            canUpdate = true;
        }
        if (canUpdate) { 
           return seminarRepository.save(newSeminar);
        } else {
            throw new InvalidSeminarException("The current seminar status does not allow to change to the provided status");
        }
    }

    public Seminar createSeminar(Seminar seminar) {
        
        if (seminar == null) {
            throw new InvalidSeminarException("Seminar not found");
        }
        if (seminar.getAccessCode() == null || seminar.getAccessCode().isEmpty()) {
            throw new BadRequestException("Empty access code");
        }
        
        seminar.setCreatedDateTime(ZonedDateTime.now());

        SeminarStatus status = SeminarStatus.TODO;
        seminar.setStatus(status);

        try {
            return seminarRepository.save(seminar);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException("Seminar with this access code already exists");
        }
    }

    public void deleteSeminar(Long seminarId) {
        if(StreamSupport.stream(seminarRepository.findAll().spliterator(), true)
        .anyMatch(s -> s.getId() == seminarId)) {
            seminarRepository.deleteById(seminarId);
        }
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    private static class InvalidSeminarException extends BadRequestException {
        public InvalidSeminarException(String msg) {
            super(msg);
        }
    }
}

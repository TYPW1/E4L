package lu.uni.e4l.platform.service;

import lu.uni.e4l.platform.model.Session;
import lu.uni.e4l.platform.model.dto.ResultBreakdown;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public ResultBreakdown calculate(Session session) {
        return ResultBreakdown.fromSession(session);
    }
}

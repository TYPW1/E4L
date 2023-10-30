package lu.uni.e4l.platform.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lu.uni.e4l.platform.model.*;
import lu.uni.e4l.platform.service.*;
import lu.uni.e4l.platform.service.crypto.SignedObjectSerializer;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// TODO: refactor the whole class to make poll generic again (don't use/modify question labels)

@Data
public class ResultBreakdown {

    private Double result;
    private User user;
    private ZonedDateTime date;
    private String sessionId;
    private List<QuestionEntry> breakdown;
    private long avgScores;
    private List<Integer> clusters = new ArrayList<>();
    private List<String> ans = new ArrayList<>();
    private List<String> situations = new ArrayList<>();
    private List<Double> scores = new ArrayList<>();
    private Double cnt;
    private List<String> note = new ArrayList<>();
    private List<String> colors = new ArrayList<>();

    public static ResultBreakdown fromSession(Session session) {
        Map<Long, List<Answer>> questionIdToAnswers = session.getAnswers().stream()
                .collect(Collectors.toMap(
                        a -> a.getPossibleAnswer().getQuestion().getId(),
                        a -> new ArrayList<>(Collections.singletonList(a)),
                        (a, b) -> Stream.concat(a.stream(), b.stream()).collect(Collectors.toList()),
                        LinkedHashMap::new
                ));

        Map<Long, Question> questionIdToQuestion = session.getAnswers().stream()
                .collect(Collectors.toMap(
                        a -> a.getPossibleAnswer().getQuestion().getId(),
                        a -> a.getPossibleAnswer().getQuestion(),
                        (a, b) -> b
                ));

        ResultBreakdown resultBreakdown = new ResultBreakdown();

        resultBreakdown.breakdown = questionIdToAnswers.entrySet().stream()
                .map(e -> QuestionEntry.fromAnswers(questionIdToQuestion.get(e.getKey()), e.getValue()))
                .collect(Collectors.toList());

        for(int k=0; k< resultBreakdown.breakdown.size();k++)
        {
            String a = "";
            String qn ="";
            for(int l=0; l<resultBreakdown.breakdown.get(k).answers.size();l++) {
                if(l==resultBreakdown.breakdown.get(k).answers.size()-1) {
                        a = a + resultBreakdown.breakdown.get(k).answers.get(l).answer;
                        if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("electric_and_heating_energy_consumption_where_do_you_work"))
                       {
                           qn = resultBreakdown.breakdown.get(k).question.replace("electric_and_heating_energy_consumption_where_do_you_work","where_do_you_work");
                           resultBreakdown.ans.add(qn + " : "+ a);
                        }
                       else{
                           qn = resultBreakdown.breakdown.get(k).question.replace("other_energy_consumptions","embodied_energy");
                           resultBreakdown.ans.add(qn + " : "+ a);
                        }

               }else{
                    a = a + resultBreakdown.breakdown.get(k).answers.get(l).answer + " & ";
                }
            }
        }

        for(int k=0; k< resultBreakdown.ans.size(); k++) {
            if (resultBreakdown.ans.get(k).contains("_"))
            {
                resultBreakdown.situations.add(resultBreakdown.ans.get(k).replace("_"," "));
            }
        }

        for(int k=0; k<resultBreakdown.breakdown.size();k++)
        {
            if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("where_do_you_live"))
            {
                resultBreakdown.colors.add("#007BFF");
            }else if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("what_is_your_diet"))
            {
                resultBreakdown.colors.add("#28A745");
            }else if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("do_you_have_pets"))
            {
                resultBreakdown.colors.add("#DC3545");
            }else if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("how_do_you_get_to_work"))
            {
                resultBreakdown.colors.add("#FFC107");
            }else if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("electric_and_heating_energy_consumption_where_do_you_work"))
            {
                resultBreakdown.colors.add("#17A2B8");
            }else if(resultBreakdown.breakdown.get(k).question.equalsIgnoreCase("holiday_travel_during_last_year"))
            {
                resultBreakdown.colors.add("#6C757D");
            }else{
                resultBreakdown.colors.add("#343A40");
            }
        }


        for(int k=0; k< resultBreakdown.breakdown.size();k++)
        {
                if (resultBreakdown.breakdown.get(k).result < 1.0 && resultBreakdown.breakdown.get(k).result > 0.0) {
                    resultBreakdown.scores.add(resultBreakdown.breakdown.get(k).result + 1.0);
                    if (resultBreakdown.breakdown.get(k).question.contains("_"))
                    {
                        resultBreakdown.note.add("$ The result of the question \" "+ resultBreakdown.breakdown.get(k).question.replace("_"," ") + " \" is increased by 1 from "+ (resultBreakdown.breakdown.get(k).result*100)/100+"\n");
                    }
                } else {
                    resultBreakdown.scores.add((resultBreakdown.breakdown.get(k).result*100)/100);
                }

        }

        resultBreakdown.result = resultBreakdown.breakdown.stream()
                .mapToDouble(QuestionEntry::getResult)
                .sum();

        resultBreakdown.user = session.getUser();

        resultBreakdown.date = session.getDateTime();

        resultBreakdown.sessionId = SignedObjectSerializer.serializeWithSignature(session.getId());

        for (int i = 0; i < resultBreakdown.situations.size(); i++) {
            String situation = resultBreakdown.situations.get(i);

            if (situation.contains(": im a "))
                situation = situation.replace("im a ", "");
            if (situation.contains(": im "))
                situation = situation.replace("im ", "");

            resultBreakdown.situations.set(i, situation);
        }

        return resultBreakdown;
    }

   public void averageCalculation(List<Session> listSessions){
       Double prevResult = 0.0;

        for (int i=0; i<listSessions.size(); i++)
        {
            ResultBreakdown res = fromSession(listSessions.get(i));
            prevResult = Double.sum(prevResult,res.result);
        }
       Double v = prevResult/listSessions.size();
       avgScores = Math.round(v);
    }

    public void listOfScores(List<Session> listSessions){
        List<Double> listOfResults = new ArrayList<>();
        for (int i=0; i<listSessions.size(); i++)
        {
            ResultBreakdown res = fromSession(listSessions.get(i));
            listOfResults.add(Math.floor(res.result*100)/100);

        }
        int count1 = 0, count2 = 0,count3 = 0,count4 = 0,count5 = 0,count6 = 0,count7 = 0,count8 = 0,count9 = 0,count10 = 0, count11 =0, count12 = 0, count13 =0, count14 =0, count15 = 0;

        for(int j=0; j<listOfResults.size();j++)
        {
            if(listOfResults.get(j)>=20 && listOfResults.get(j)<40)
            {
                count1 = count1+1;
            }else if (listOfResults.get(j)>=40 && listOfResults.get(j)<60)
            {
                count2 = count2+1;
            }else if(listOfResults.get(j)>=60 && listOfResults.get(j)<80)
            {
                count3 = count3+1;
            }else if(listOfResults.get(j)>=80 && listOfResults.get(j)<100)
            {
                count4 = count4+1;
            }else if(listOfResults.get(j)>=100 && listOfResults.get(j)<120){
                count5 = count5+1;
            }else if(listOfResults.get(j)>=120 && listOfResults.get(j)<140)
            {
                count6 = count6+1;
            }else if(listOfResults.get(j)>=140 && listOfResults.get(j)<160)
            {
                count7 = count7+1;
            }else if(listOfResults.get(j)>=160 && listOfResults.get(j)<180){
                count8 = count8+1;
            }
            else if(listOfResults.get(j)>=180 && listOfResults.get(j)<200){
                count9 = count9+1;
            }else if(listOfResults.get(j)>=200 && listOfResults.get(j)<220){
                count10 = count10+1;
            }else if(listOfResults.get(j)>=220 && listOfResults.get(j)<240){
                count11 = count11+1;
            }else if(listOfResults.get(j)>=240 && listOfResults.get(j)<260){
                count12 = count12+1;
            }else if(listOfResults.get(j)>=260 && listOfResults.get(j)<280){
                count13 = count13+1;
            }else if(listOfResults.get(j)>=280 && listOfResults.get(j)<300){
                count14 = count14+1;
            }else if(listOfResults.get(j)>=300)
            {
                count15 = count15+1;
            }
        }
        clusters.add(count1); clusters.add(count2); clusters.add(count3); clusters.add(count4); clusters.add(count5);
        clusters.add(count6); clusters.add(count7); clusters.add(count8); clusters.add(count9); clusters.add(count10);
        clusters.add(count11);clusters.add(count12);clusters.add(count13);clusters.add(count14);clusters.add(count15);

        /*if(listOfResults.get(0) > 200.00)
        {
            cnt = 208.00;
        }
        else if(listOfResults.get(0) <= 200.00)
        {
            cnt = listOfResults.get(0);
        }*/

    }
    
    public Double getResult() {
        return result;
    }

    @Data
    public static class QuestionEntry {
        private String question;
        private List<AnswerEntry> answers;
        private Double result;
        private String detailsFile;

        public static QuestionEntry fromAnswers(Question question, List<Answer> answers) {
            QuestionEntry questionEntry = new QuestionEntry();

            questionEntry.question = question.getName();

            questionEntry.detailsFile = question.getDetailsFile();

            questionEntry.result = answers.stream()
                    .mapToDouble(asw ->
                            Math.floor(ExpressionEvaluator.evaluate(asw.getPossibleAnswer().getFormula(), asw.getVariableValues()) * 100) / 100)
                    .sum();
            questionEntry.answers = answers.stream()
                    .map(a -> new AnswerEntry(a.getPossibleAnswer().getName(), a.getVariableValues()))
                    .collect(Collectors.toList());

            return questionEntry;
        }

        @Data
        @AllArgsConstructor
        public static class AnswerEntry {
            private String answer;
            private List<VariableValue> variables;
        }
    }
}

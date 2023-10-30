package lu.uni.e4l.platform.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lu.uni.e4l.platform.model.*;
import lu.uni.e4l.platform.service.*;
import lu.uni.e4l.platform.service.crypto.SignedObjectSerializer;
import lu.uni.e4l.platform.model.dto.ResultBreakdown;

import lu.uni.e4l.platform.service.SessionService;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
public class ResultBreakdownSeminar {

    private List<ResultBreakdown> resultBreakdownList;
    private long averageScore;
    private long averageScoreSeminar;
    private List<Integer> clusters;
    private List<Integer> clustersSeminarList;

    protected ResultBreakdownSeminar(List<ResultBreakdown> resultBreakdownList, long averageScore, long averageScoreSeminar, List<Integer> clusters, List<Integer> clustersSeminarList) {
        this.resultBreakdownList = resultBreakdownList;
        this.averageScore = averageScore;
        this.averageScoreSeminar = averageScoreSeminar;
        this.clusters = clusters;
        this.clustersSeminarList = clustersSeminarList;

    }

    public static ResultBreakdownSeminar newFromSeminar(Seminar seminar, SessionService sessionService) {
        List<ResultBreakdown> resultBreakdownList = new ArrayList<>();
        List<Double> resultList = new ArrayList<>();
        List<Double> resultListSeminar = new ArrayList<>();
        long averageScore =0;
        long averageScoreSeminar = 0;
        List<Integer> clusterList = new ArrayList<>();
        List<Integer> clusterListSeminar= new ArrayList<>();

        List<Long> sessionIdList = seminar.getSessions().stream()
            .map(s -> s.getId())
            .collect(Collectors.toList());

        resultBreakdownList = seminar.getSessions().stream()
            .map(ResultBreakdown::fromSession)
            .collect(Collectors.toList());

        resultList = sessionService.getSessions().stream()
            .map(session -> ResultBreakdown.fromSession(session).getResult())
            .collect(Collectors.toList());

        Double prevResult = resultList.stream()
            .collect(Collectors.summingDouble(Double::doubleValue));
        
        Double value = prevResult/sessionService.getSessions().size();
        averageScore = Math.round(value);
        
        resultListSeminar = resultBreakdownList.stream()
            .map(result -> result.getResult())
            .collect(Collectors.toList());

        prevResult = resultListSeminar.stream()
            .collect(Collectors.summingDouble(Double::doubleValue));
        
        value = prevResult/resultBreakdownList.size();
        averageScoreSeminar = Math.round(value);

        clusterList = listOfScores(resultList);

        clusterListSeminar = listOfScores(resultListSeminar);
        
        return new ResultBreakdownSeminar(resultBreakdownList, averageScore, averageScoreSeminar, clusterList, clusterListSeminar);
    }

    public List<ResultBreakdown> getResultBreakdownList() {
        return this.resultBreakdownList;
    }

    public void setResultBreakdownList(List<ResultBreakdown> newResultBreakdownList) {
        this.resultBreakdownList = newResultBreakdownList;
    }

    public void addResultBreakdown(ResultBreakdown resultBreakdown) {
        this.resultBreakdownList.add(resultBreakdown);
    }

    public List<Integer> getClusters() {
        return this.clusters;
    }

    public void setClusters(List<Integer> newClusters) {
        this.clusters = newClusters;
    }
    
    public void addCluster(Integer cluster) {
        this.clusters.add(cluster);
    }
    
    public List<Integer> getClustersSeminarList() {
        return this.clustersSeminarList;
    }

    public void setClustersSeminarList(List<Integer> newClustersSeminarList) {
        this.clustersSeminarList = newClustersSeminarList;
    }
    
    public void addClustersSeminar(Integer clustersSeminar) {
        this.clusters.add(clustersSeminar);
    }

    public static List<Integer> listOfScores(List<Double> resultList){
        List<Integer> clusters = new ArrayList<>();
        
        resultList.stream()
            .map(result -> Math.floor(result*100)/100);
        
        int count1 = 0, count2 = 0,count3 = 0,count4 = 0,count5 = 0,count6 = 0,count7 = 0,count8 = 0,count9 = 0,count10 = 0, count11 =0, count12 = 0, count13 =0, count14 =0, count15 = 0;

        for(int j=0; j<resultList.size();j++)
        {
            if(resultList.get(j)>=20 && resultList.get(j)<40)
            {
                count1 = count1+1;
            }else if (resultList.get(j)>=40 && resultList.get(j)<60)
            {
                count2 = count2+1;
            }else if(resultList.get(j)>=60 && resultList.get(j)<80)
            {
                count3 = count3+1;
            }else if(resultList.get(j)>=80 && resultList.get(j)<100)
            {
                count4 = count4+1;
            }else if(resultList.get(j)>=100 && resultList.get(j)<120){
                count5 = count5+1;
            }else if(resultList.get(j)>=120 && resultList.get(j)<140)
            {
                count6 = count6+1;
            }else if(resultList.get(j)>=140 && resultList.get(j)<160)
            {
                count7 = count7+1;
            }else if(resultList.get(j)>=160 && resultList.get(j)<180){
                count8 = count8+1;
            }
            else if(resultList.get(j)>=180 && resultList.get(j)<200){
                count9 = count9+1;
            }else if(resultList.get(j)>=200 && resultList.get(j)<220){
                count10 = count10+1;
            }else if(resultList.get(j)>=220 && resultList.get(j)<240){
                count11 = count11+1;
            }else if(resultList.get(j)>=240 && resultList.get(j)<260){
                count12 = count12+1;
            }else if(resultList.get(j)>=260 && resultList.get(j)<280){
                count13 = count13+1;
            }else if(resultList.get(j)>=280 && resultList.get(j)<300){
                count14 = count14+1;
            }else if(resultList.get(j)>=300)
            {
                count15 = count15+1;
            }
        }
        clusters.add(count1); clusters.add(count2); clusters.add(count3); clusters.add(count4); clusters.add(count5);
        clusters.add(count6); clusters.add(count7); clusters.add(count8); clusters.add(count9); clusters.add(count10);
        clusters.add(count11);clusters.add(count12);clusters.add(count13);clusters.add(count14);clusters.add(count15);

        return clusters;
        /*if(resultList.get(0) > 200.00)
        {
            cnt = 208.00;
        }
        else if(resultList.get(0) <= 200.00)
        {
            cnt = resultList.get(0);
        }*/

    }
    
}
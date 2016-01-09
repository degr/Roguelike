package org.forweb.roguelike.entity.person;

public class Race {
    private String name;

    Statistics statisticsMin;
    Statistics statisticsMiddle;
    Statistics statisticsLimit;

    public Statistics getStatisticsMin() {
        return statisticsMin;
    }

    public void setStatisticsMin(Statistics statisticsMin) {
        this.statisticsMin = statisticsMin;
    }

    public Statistics getStatisticsMiddle() {
        return statisticsMiddle;
    }

    public void setStatisticsMiddle(Statistics statisticsMiddle) {
        this.statisticsMiddle = statisticsMiddle;
    }

    public Statistics getStatisticsLimit() {
        return statisticsLimit;
    }

    public void setStatisticsLimit(Statistics statisticsLimit) {
        this.statisticsLimit = statisticsLimit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

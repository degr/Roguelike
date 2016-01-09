package org.forweb.roguelike.entity.person.race;

import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.entity.person.Statistics;

public class Human extends Race {

    private static Human instance;

    public static Human getInstance(){
        if(instance == null) {
            instance = new Human();
        }
        return instance;
    }


    public static Statistics MIN = new Statistics        (1, 1, 1, 1, 1, 1, 1, 1);
    public static Statistics MIDDLE = new Statistics     (6, 6, 6, 6, 6, 6, 6, 6);
    public static Statistics LIMIT = new Statistics      (9, 9, 9, 9, 9, 9, 9, 9);


    private Human() {
        setName(this.getClass().getSimpleName().toLowerCase());
        setStatisticsMin(MIN);
        setStatisticsMiddle(MIDDLE);
        setStatisticsLimit(LIMIT);
    }
}

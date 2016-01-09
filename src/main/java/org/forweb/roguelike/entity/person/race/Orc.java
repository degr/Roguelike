package org.forweb.roguelike.entity.person.race;

import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.entity.person.Statistics;

public class Orc extends Race {

    private static Orc instance;

    public static Orc getInstance(){
        if(instance == null) {
            instance = new Orc();
        }
        return instance;
    }


    public static Statistics MIN = new Statistics        (3,  3,  2, 1, 1, 1, 1, 1);
    public static Statistics MIDDLE = new Statistics     (7,  7,  5, 4, 4, 4, 3, 6);
    public static Statistics LIMIT = new Statistics      (12, 12, 9, 8, 8, 8, 7, 10);


    private Orc() {
        setName(this.getClass().getSimpleName().toLowerCase());
        setStatisticsMin(MIN);
        setStatisticsMiddle(MIDDLE);
        setStatisticsLimit(LIMIT);
    }
}

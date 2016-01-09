package org.forweb.roguelike.entity.person.race;

import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.entity.person.Statistics;

public class Hobbit extends Race {

    private static Hobbit instance;

    public static Hobbit getInstance(){
        if(instance == null) {
            instance = new Hobbit();
        }
        return instance;
    }


    public static Statistics MIN = new Statistics        (1,  1,  3,  2, 1,  2,  2,  1);
    public static Statistics MIDDLE = new Statistics     (4,  5,  9,  5, 5,  6,  5,  9);
    public static Statistics LIMIT = new Statistics      (8,  9, 12,  8, 8, 9, 9, 12);


    private Hobbit() {
        setName(this.getClass().getSimpleName().toLowerCase());
        setStatisticsMin(MIN);
        setStatisticsMiddle(MIDDLE);
        setStatisticsLimit(LIMIT);
    }
}

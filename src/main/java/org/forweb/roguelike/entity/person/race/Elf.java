package org.forweb.roguelike.entity.person.race;

import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.entity.person.Statistics;

public class Elf extends Race {

    private static Elf instance;

    public static Elf getInstance(){
        if(instance == null) {
            instance = new Elf();
        }
        return instance;
    }


    public static Statistics MIN = new Statistics        (1,  1,  2,  1, 2,  2,  3,  1);
    public static Statistics MIDDLE = new Statistics     (5,  5,  6,  5, 6,  6,  6,  6);
    public static Statistics LIMIT = new Statistics      (8,  8, 10,  9, 10, 10, 12, 10);


    private Elf() {
        setName(this.getClass().getSimpleName().toLowerCase());
        setStatisticsMin(MIN);
        setStatisticsMiddle(MIDDLE);
        setStatisticsLimit(LIMIT);
    }
}

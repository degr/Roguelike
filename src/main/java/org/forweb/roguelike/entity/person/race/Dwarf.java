package org.forweb.roguelike.entity.person.race;

import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.entity.person.Statistics;

public class Dwarf extends Race {

    private static Dwarf instance;
    
    public static Dwarf getInstance(){
        if(instance == null) {
            instance = new Dwarf();
        }
        return instance;
    }
    
    public static Statistics MIN = new Statistics        (1,  3,  1,  1, 1, 1, 1, 1);
    public static Statistics MIDDLE = new Statistics     (7,  9,  5,  7, 5, 5, 5, 6);
    public static Statistics LIMIT = new Statistics      (10, 12, 9, 10, 8, 8, 8, 10);
    
    
    private Dwarf() {
        setName(this.getClass().getSimpleName().toLowerCase());
        setStatisticsMin(MIN);
        setStatisticsMiddle(MIDDLE);
        setStatisticsLimit(LIMIT);
    }
}

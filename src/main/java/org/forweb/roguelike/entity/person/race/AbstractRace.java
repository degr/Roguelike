package org.forweb.roguelike.entity.person.race;

import org.forweb.roguelike.effects.Effect;
import org.forweb.roguelike.entity.AbstractEntity;
import org.forweb.roguelike.entity.person.Statistics;

/**
 * Created by Ror on 03.01.2016.
 */

public abstract class AbstractRace {
    
    
    public AbstractRace(Statistics min, Statistics limitations, Statistics limit) {
        this.min = min;
        this.limitations = limitations;
        this.limit = limit;
    }
    protected String name;
    protected Statistics min;
    protected Statistics limitations;
    protected Statistics limit;
    
    public Statistics getMin(){
        return min;
    }
    public Statistics getLimitations(){
        return limitations;
    }
    public Statistics getLimit(){
        return limit;
    }
    public String getName() {
        return name;
    }

}

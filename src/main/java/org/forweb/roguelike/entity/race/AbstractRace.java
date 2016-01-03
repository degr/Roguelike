package org.forweb.roguelike.entity.race;

import org.forweb.roguelike.entity.AbstractEntity;
import org.forweb.roguelike.entity.utils.Statistics;

/**
 * Created by Ror on 03.01.2016.
 */
public abstract class AbstractRace extends AbstractEntity {
    
    public AbstractRace(Statistics min, Statistics limitations, Statistics limit) {
        this.min = min;
        this.limitations = limitations;
        this.limit = limit;
    }
    
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
}

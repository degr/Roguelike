package org.forweb.roguelike.map;


import org.forweb.roguelike.effects.Effect;

import java.util.List;

/**
 * Created by Ror on 03.01.2016.
 */
public class Cell {
    public Cell(Floor floor) {
        this.floor = floor;
    }
    
    private Floor floor;
    private MapObject mapObject;
    private List<Effect> effects;
    
    public Floor getFloor() {
        return floor;
    }

    public void setFloor(Floor floor) {
        this.floor = floor;
    }

    public MapObject getMapObject() {
        return mapObject;
    }

    public void setMapObject(MapObject mapObject) {
        this.mapObject = mapObject;
    }

    public List<Effect> getEffects() {
        return effects;
    }

    public void setEffects(List<Effect> effects) {
        this.effects = effects;
    }
}

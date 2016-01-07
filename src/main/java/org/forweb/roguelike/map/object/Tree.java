package org.forweb.roguelike.map.object;

import org.forweb.roguelike.map.MapObject;

/**
 * Created by Ror on 03.01.2016.
 */
public class Tree implements MapObject{
    private String path;
    public Tree(String path){
        this.path = path + ".jpg";
    }
    @Override
    public String getImage() {
        return this.path;
    }
}

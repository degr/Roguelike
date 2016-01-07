package org.forweb.roguelike.factory;

import org.forweb.roguelike.map.Cell;
import org.forweb.roguelike.map.Floor;
import org.forweb.roguelike.map.WorldMap;
import org.forweb.roguelike.map.object.Tree;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Created by Ror on 03.01.2016.
 */
public class WorldFactory {
    public static WorldMap buildMap(){
        return buildMap(200, 200);
    }
    public static WorldMap buildMap(int x, int y){
        return buildMap(x, y, Floor.Grass);
    }

    public static WorldMap buildMap(int x, int y, Floor floor){
        WorldMap out = new WorldMap(x, y);
        for(int i = 0; i < y; i++) {
            Map<Integer, String> objects = new HashMap<>(x);
            Random rand = new Random();
            for(int o = 0; o < x / 3; o++) {
                int r = rand.nextInt(x);
                objects.put(r, "tree");
            }
            for(int j = 0; j < x; j++) {
                Cell cell = new Cell(floor);
                if(objects.containsKey(j)) {
                    cell.setMapObject(new Tree(objects.get(j)));
                }
                out.add(i, j, cell);
            }
        }
        return out;
    }
}

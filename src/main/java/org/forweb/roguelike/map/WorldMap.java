package org.forweb.roguelike.map;

/**
 * Created by Ror on 03.01.2016.
 */
public class WorldMap {
    private Cell[][] map;
    
    public void add(int x, int y, Cell cell) {
        map[y][x] = cell;
    }
    
    public WorldMap(int x, int y) {
        map = new Cell[y][x];
    }
    
    public Cell[][] getRound(int centerX, int centerY, int radius){
        Cell[][] out = getQuadrant(centerX - radius, centerY - radius, radius * 2 + 1);
        for(int i = 0; i < out.length; i++) {
            int catet1Length = calculateCatet(i, radius);
            for(int j = 0; j < out[i].length; j++) {
                int catet2Length = calculateCatet(j, radius);
                if(radius * radius < catet1Length * catet1Length + catet2Length * catet2Length) {
                    out[i][j] = null;
                }
            }
        }
        return out;
    }
    
    private int calculateCatet(int i, int radius) {
        if(i < radius) {
            return radius - i;
        } else if( i > radius) {
            return i - radius;
        } else {
            return 0;
        }
    }
    
    public Cell[][] getSquare(int x1, int y1, int x2, int y2) {
        if(x1 < 0) {
            x1 = 0;
        }
        if(y1 < 0) {
            y1 = 0;
        }
        if(x2 > map[0].length) {
            x2 = map[0].length - 1;
        }
        if(y2 > map.length) {
            y2 = map.length - 1;
        }
        if(y1 > y2) {
            throw new RuntimeException("Invalid arguments (y2 less than y1)");
        }

        if(y1 > y2) {
            throw new RuntimeException("Invalid arguments (y2 less than y1)");
        }
        Cell[][] out = new Cell[x2 - x1][ y2 - y1];
        
        int y = 0;
        for(int i = y1; i < y2; i++) {
            int x = 0;
            for(int j = x1; j < x2; j++) {
                out[y][x] = map[i][j];
                x++;
            }
            y++;
        }
        return out;
    }
    
    public Cell[][] getQuadrant(int xLeft, int yTop, int size){
        return getSquare(xLeft, yTop, xLeft + size, yTop + size);
    }
}


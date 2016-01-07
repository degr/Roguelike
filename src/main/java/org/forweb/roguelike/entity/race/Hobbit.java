package org.forweb.roguelike.entity.race;

import org.forweb.roguelike.entity.utils.Statistics;

/**
 * Created by Ror on 03.01.2016.
 */
public class Hobbit extends AbstractRace {
    public static Statistics MIN = new Statistics(1, 3, 1, 1, 1, 1, 1, 1);
    public static Statistics LIMITATIONS = new Statistics(7, 9, 5, 7, 5, 5, 5, 6);
    public static Statistics LIMIT = new Statistics(10, 12, 9, 10, 8, 8, 8, 10);

    public Hobbit() {
	super(MIN, LIMITATIONS, LIMIT);
    }
}

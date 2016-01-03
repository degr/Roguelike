package org.forweb.roguelike.entity.inventory;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Ring.TYPE)
public class Ring extends AbstractItem {
    public static final String TYPE = "ring";
}
package org.forweb.roguelike.entity.inventory;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Amulet.TYPE)
public class Amulet extends AbstractItem {
    public static final String TYPE = "amulet";
}
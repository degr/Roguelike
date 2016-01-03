package org.forweb.roguelike.entity.inventory.weapon;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Shield.TYPE)
public class Shield extends AbstractWeapon {
    public static final String TYPE = "shield";
}

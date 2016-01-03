package org.forweb.roguelike.entity.inventory.weapon;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Staff.TYPE)
public class Staff extends AbstractWeapon {
    public static final String TYPE = "staff";
}

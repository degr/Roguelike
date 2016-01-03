package org.forweb.roguelike.entity.inventory.weapon;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Mace.TYPE)
public class Mace extends AbstractWeapon {
    public static final String TYPE = "mace";
}

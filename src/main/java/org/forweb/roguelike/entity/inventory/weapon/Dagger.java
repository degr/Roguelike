package org.forweb.roguelike.entity.inventory.weapon;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Dagger.TYPE)
public class Dagger extends AbstractWeapon {
    public static final String TYPE = "dagger";
}

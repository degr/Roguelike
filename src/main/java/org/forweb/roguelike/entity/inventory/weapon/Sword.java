package org.forweb.roguelike.entity.inventory.weapon;

import org.forweb.roguelike.entity.inventory.AbstractItem;

import javax.persistence.*;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Sword.TYPE)
public class Sword extends AbstractWeapon {
    public static final String TYPE = "sword";
}

package org.forweb.roguelike.entity.inventory;

import org.forweb.roguelike.entity.inventory.weapon.AbstractWeapon;

import javax.persistence.DiscriminatorValue;

/**
 * Created by Ror on 03.01.2016.
 */
@DiscriminatorValue(Armor.TYPE)
public class Armor extends AbstractItem {
    public static final String TYPE = "armor";
}
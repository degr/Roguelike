package org.forweb.roguelike.entity.inventory;

import org.forweb.roguelike.effects.Effect;
import org.forweb.roguelike.entity.AbstractEntity;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Inheritance;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import java.util.List;

import static javax.persistence.DiscriminatorType.STRING;
import static javax.persistence.InheritanceType.SINGLE_TABLE;

/**
 * Created by Ror on 03.01.2016.
 */

@Table(name="items")
@Inheritance(strategy=SINGLE_TABLE)
@DiscriminatorColumn(name="type", discriminatorType=STRING)
@MappedSuperclass
public abstract class AbstractItem extends AbstractEntity{
    
    private String type;
    private String name;
    private String description;
    private List<Effect> effects;

    public List<Effect> getEffects() {
        return effects;
    }

    public void setEffects(List<Effect> effects) {
        this.effects = effects;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

package org.forweb.roguelike.entity.effect;

import org.forweb.roguelike.entity.AbstractEntity;

import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import java.time.Instant;

@MappedSuperclass
@Table(name = "effect")
public abstract class AbstractEffect extends AbstractEntity {

    public enum Action {
        stat, skill, hitPoints, common, special;
    }
    
    private String name;
    private Instant activeTo;
    private Action action;
    private Integer modifier;
    private String target;
    private Boolean visible;
    private String description;

    public final String getName() {
        return name;
    }

    public final void setName(String name) {
        this.name = name;
    }

    public final Instant getActiveTo() {
        return activeTo;
    }

    public final void setActiveTo(Instant activeTo) {
        this.activeTo = activeTo;
    }

    public final Action getAction() {
        return action;
    }

    public final void setAction(Action action) {
        this.action = action;
    }

    public final int getModifier() {
        return modifier;
    }

    public final void setModifier(int modifier) {
        this.modifier = modifier;
    }

    public final String getTarget() {
        return target;
    }

    public final void setTarget(String target) {
        this.target = target;
    }

    public final boolean isVisible() {
        return visible;
    }

    public final void setVisible(boolean visible) {
        this.visible = visible;
    }

    public final String getDescription() {
        return description;
    }

    public final void setDescription(String description) {
        this.description = description;
    }

}

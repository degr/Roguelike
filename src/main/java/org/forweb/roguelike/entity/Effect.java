package org.forweb.roguelike.entity;

import java.time.Instant;

public class Effect extends AbstractEntity {

    public Effect() {
	super();
    }

    public Effect(String name, Instant activeTo, Action action, int modifier, String target, boolean visible,
	    String description) {
	super();
	this.name = name;
	this.activeTo = activeTo;
	this.action = action;
	this.modifier = modifier;
	this.target = target;
	this.visible = visible;
	this.description = description;
    }

    private String name;
    private Instant activeTo;
    private Action action;
    private int modifier;
    private String target;
    private boolean visible;
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

package org.forweb.roguelike.entity.map;

import org.forweb.roguelike.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="environment")
public class Environment extends AbstractEntity {
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

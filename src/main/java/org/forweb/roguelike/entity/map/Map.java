package org.forweb.roguelike.entity.map;

import org.forweb.roguelike.entity.AbstractEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "map")
public class Map extends AbstractEntity {

    private String title;
    @Column(columnDefinition = "TEXT")
    private String jsonMap;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getJsonMap() {
        return jsonMap;
    }

    public void setJsonMap(String jsonMap) {
        this.jsonMap = jsonMap;
    }
}

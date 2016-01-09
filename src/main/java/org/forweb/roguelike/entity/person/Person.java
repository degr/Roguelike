package org.forweb.roguelike.entity.person;

import org.forweb.roguelike.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Person extends AbstractEntity {

    public enum Gender {
        MALE, FEMALE, UNDIFFERENTIATED
    }

    private Gender gender;
    private String name;
    private String race;
    private Integer hitPoints;
    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY)
    private List<Statistics> statistics;
    private Integer experience;

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }


    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public String getRace() {
        return race;
    }

    public List<Statistics> getStatistics() {
        return statistics;
    }

    public void setStatistics(List<Statistics> statistics) {
        this.statistics = statistics;
    }

    public Integer getHitPoints() {
        return hitPoints;
    }

    public void setHitPoints(Integer hitPoints) {
        this.hitPoints = hitPoints;
    }

}

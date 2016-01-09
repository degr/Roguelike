package org.forweb.roguelike.entity.person;

import org.forweb.roguelike.entity.AbstractEntity;

import javax.persistence.Entity;


@Entity
public class Statistics extends AbstractEntity{
    
    public Statistics(Integer strength, Integer endurance, Integer dexterity, Integer willpower, Integer intelligence, Integer perception, Integer charisma, Integer luck) {
        this.strength = strength;
        this.endurance = endurance;
        this.dexterity = dexterity;
        this.willpower = willpower;
        this.intelligence = intelligence;
        this.perception = perception;
        this.charisma = charisma;
        this.luck = luck;
    }
    
    private Integer strength;
    private Integer endurance;
    private Integer dexterity;
    private Integer willpower;
    private Integer intelligence;
    private Integer perception;
    private Integer charisma;
    private Integer luck;
    
    public Integer getLuck() {
        return luck;
    }

    public void setLuck(Integer luck) {
        this.luck = luck;
    }

    public Integer getCharisma() {
        return charisma;
    }

    public void setCharisma(Integer charisma) {
        this.charisma = charisma;
    }

    public Integer getPerception() {
        return perception;
    }

    public void setPerception(Integer perception) {
        this.perception = perception;
    }

    public Integer getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(Integer intelligence) {
        this.intelligence = intelligence;
    }

    public Integer getWillpower() {
        return willpower;
    }

    public void setWillpower(Integer willpower) {
        this.willpower = willpower;
    }

    public Integer getDexterity() {
        return dexterity;
    }

    public void setDexterity(Integer dexterity) {
        this.dexterity = dexterity;
    }

    public Integer getEndurance() {
        return endurance;
    }

    public void setEndurance(Integer endurance) {
        this.endurance = endurance;
    }

    public Integer getStrength() {
        return strength;
    }

    public void setStrength(Integer strength) {
        this.strength = strength;
    }

}

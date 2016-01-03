package org.forweb.roguelike.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Created by Ror on 03.01.2016.
 */
@MappedSuperclass
public abstract class AbstractEntity extends AbstractPersistable {
    
}

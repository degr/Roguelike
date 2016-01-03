package org.forweb.roguelike.dao;

import org.forweb.roguelike.entity.AbstractEntity;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Ror on 03.01.2016.
 */
public interface AbstractDao<T extends AbstractEntity>
        extends CrudRepository<T, Integer> {
}

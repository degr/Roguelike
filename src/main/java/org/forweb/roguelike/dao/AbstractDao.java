package org.forweb.roguelike.dao;

import org.forweb.roguelike.entity.AbstractEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * Created by Ror on 03.01.2016.
 */
@NoRepositoryBean
public interface AbstractDao<T extends AbstractEntity>  extends JpaRepository<T, Integer>, JpaSpecificationExecutor<T> {

}

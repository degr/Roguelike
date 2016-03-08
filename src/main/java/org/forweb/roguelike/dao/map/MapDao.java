package org.forweb.roguelike.dao.map;

import org.forweb.roguelike.dao.AbstractDao;
import org.forweb.roguelike.entity.map.Map;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface MapDao extends AbstractDao<Map> {
    @Query("select m from Map as m where m.title = :title")
    Map findByName(@Param("title") String title);
}

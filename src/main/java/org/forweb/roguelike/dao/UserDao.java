package org.forweb.roguelike.dao;

import org.forweb.roguelike.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by Ror on 03.01.2016.
 */

public interface UserDao extends AbstractDao<User> {
    @Query("select u from user u where name=:name")
    User getUserByName(@Param("name") String name);
}

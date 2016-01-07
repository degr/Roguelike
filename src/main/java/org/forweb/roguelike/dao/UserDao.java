package org.forweb.roguelike.dao;

import org.forweb.roguelike.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Ror on 03.01.2016.
 */
@Repository
public interface UserDao extends AbstractDao<User> {
    @Query("select u from User as u where email=:email")
    User getUserByEmail(@Param("email") String email);
}

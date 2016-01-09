package org.forweb.roguelike.dao.person;

import org.forweb.roguelike.dao.AbstractDao;
import org.forweb.roguelike.entity.person.Person;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonDao extends AbstractDao<Person> {
}

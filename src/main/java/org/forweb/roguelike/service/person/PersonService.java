package org.forweb.roguelike.service.person;

import org.forweb.roguelike.dao.person.PersonDao;
import org.forweb.roguelike.entity.person.Person;
import org.forweb.roguelike.entity.effect.Hit;
import org.forweb.roguelike.service.AbstractService;
import org.springframework.stereotype.Service;

@Service
public class PersonService extends AbstractService<Person, PersonDao> {
    public void addHit(Person person, Hit hit){
        int total = getDamageReduction(person) - hit.getModifier();
        if(total < 0) {
            total = 0;
        }
       // person.setHitPoints(person.getHitPoints() - total);
    }

    public Integer getDamageReduction(Person person){
        return 0;
    }
}

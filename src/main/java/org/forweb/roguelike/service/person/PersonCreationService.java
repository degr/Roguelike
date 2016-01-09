package org.forweb.roguelike.service.person;

import org.apache.commons.lang3.StringUtils;
import org.forweb.roguelike.entity.person.Person;
import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.utils.ClassUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Ror on 09.01.2016.
 */
@Service
public class PersonCreationService {
    
    
    @Autowired
    PersonService personService;
    
    @Autowired
    RaceService raceService;
    
    public void onPersonCreateStep1(Person person, String personName, String raceName, Person.Gender gender) throws Exception {
        person.setName(personName);
        person.setGender(gender);
        
        Race race = raceService.getRace(raceName);
        person.setRace(race.getName());
        personService.save(person);
    }


}

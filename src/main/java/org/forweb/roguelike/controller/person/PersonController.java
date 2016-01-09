package org.forweb.roguelike.controller.person;

import org.forweb.roguelike.controller.AbstractRestController;
import org.forweb.roguelike.dao.person.PersonDao;
import org.forweb.roguelike.entity.person.Person;
import org.forweb.roguelike.service.person.PersonCreationService;
import org.forweb.roguelike.service.person.PersonService;
import org.forweb.roguelike.service.person.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("person")
public class PersonController extends AbstractRestController<Person, PersonDao, PersonService> {

    @Autowired
    PersonService personService;
    @Autowired
    PersonCreationService personCreationService;
    @Autowired
    RaceService raceService;


    @RequestMapping("/on-create-1")
    public Integer onPersonCreateStep1(
            @RequestParam String name,
            @RequestParam String race,
            @RequestParam Person.Gender gender,
            @RequestParam(required = false) Integer personId
    ) throws Exception {
        Person person = personId == null ? new Person() : personService.findOne(personId);
        personCreationService.onPersonCreateStep1(person, name, race, gender);
        return person.getId();
    }

    @RequestMapping("/get-races")
    public List<String> getRaces() {
        return raceService.getRacesList();
    }
}

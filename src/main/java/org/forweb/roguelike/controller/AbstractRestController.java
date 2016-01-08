package org.forweb.roguelike.controller;

import javassist.tools.web.BadHttpRequest;
import org.forweb.roguelike.dao.AbstractDao;
import org.forweb.roguelike.entity.AbstractEntity;
import org.forweb.roguelike.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class AbstractRestController<T extends AbstractEntity, D extends AbstractDao<T>, S extends AbstractService<T, D>> {
    @Autowired
    S service;

    @RequestMapping(method = RequestMethod.GET, value="/{id}")
    @ResponseBody
    public AbstractEntity show(@PathVariable Integer id) throws BadHttpRequest {
        return service.findOne(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Integer create(@RequestBody T item) throws BadHttpRequest {
        if(item.getId() == null) {
            service.save(item);
            return item.getId();
        } else {
            throw new BadHttpRequest();
        }
    }
    @RequestMapping(method = RequestMethod.PUT, value="/{id}")
    public void update(@RequestBody T item, @PathVariable Integer id) throws BadHttpRequest {
        if(item.getId() != null && item.getId().equals(id)) {
            service.save(item);
        } else {
            throw new BadHttpRequest();
        }
    }
    @RequestMapping(method =  RequestMethod.DELETE, value="/{id}")
    public void delete(@PathVariable Integer id){
        service.delete(id);
    }
    
}

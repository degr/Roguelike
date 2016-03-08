package org.forweb.roguelike.controller;

import javassist.tools.web.BadHttpRequest;
import org.forweb.roguelike.dao.AbstractDao;
import org.forweb.roguelike.entity.AbstractEntity;
import org.forweb.roguelike.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class AbstractRestController<T extends AbstractEntity, D extends AbstractDao<T>, S extends AbstractService<T, D>> {
    @Autowired
    S service;

    @RequestMapping(method = RequestMethod.GET, value="/{id}")
    @ResponseBody
    public AbstractEntity show(@PathVariable Integer id) {
        return service.findOne(id);
    }
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<T> showAll() {
        return service.findAll();
    }
    
    
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Integer create(@RequestBody T item) throws BadHttpRequest {

        MappingJackson2HttpMessageConverter m = new MappingJackson2HttpMessageConverter(null);
        m.read(null, null, null)
        if(item.getId() == null) {
            service.save(item);
            return item.getId();
        } else {
            throw new BadHttpRequest();
        }
    }
    @RequestMapping(method = RequestMethod.PUT, value="/{id}")
    @ResponseBody
    public Integer update(@RequestBody T item, @PathVariable Integer id) throws BadHttpRequest {
        if(item.getId() != null && item.getId().equals(id)) {
            service.save(item);
            return item.getId();
        } else {
            throw new BadHttpRequest();
        }
    }
    @RequestMapping(method =  RequestMethod.DELETE, value="/{id}")
    @ResponseBody
    public Integer delete(@PathVariable Integer id){
        try {
            service.delete(id);
            return 1;
        } catch (EmptyResultDataAccessException e) {
            return 0;
        }
    }
    
}

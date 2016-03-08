package org.forweb.roguelike.service.map;

import org.forweb.roguelike.dao.map.EnvironmentDao;
import org.forweb.roguelike.entity.map.Environment;
import org.forweb.roguelike.service.HashService;
import org.springframework.stereotype.Service;

@Service
public class EnvironmentService extends HashService<Environment, EnvironmentDao> {
    
}

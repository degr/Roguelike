package org.forweb.roguelike.service.map;

import org.forweb.roguelike.dao.map.MapObjectDao;
import org.forweb.roguelike.entity.map.MapObject;
import org.forweb.roguelike.service.HashService;
import org.springframework.stereotype.Service;

@Service
public class MapObjectService extends HashService<MapObject, MapObjectDao> {
    
}

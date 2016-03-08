package org.forweb.roguelike.controller.map;

import org.forweb.roguelike.controller.AbstractRestController;
import org.forweb.roguelike.dao.map.EnvironmentDao;
import org.forweb.roguelike.dao.map.MapObjectDao;
import org.forweb.roguelike.entity.map.Environment;
import org.forweb.roguelike.entity.map.MapObject;
import org.forweb.roguelike.service.map.EnvironmentService;
import org.forweb.roguelike.service.map.MapObjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("map_object")
public class MapObjectController extends AbstractRestController<MapObject, MapObjectDao, MapObjectService> {
    
}

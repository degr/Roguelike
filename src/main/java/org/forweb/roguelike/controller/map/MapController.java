package org.forweb.roguelike.controller.map;

import org.forweb.roguelike.controller.AbstractRestController;
import org.forweb.roguelike.dao.map.MapDao;
import org.forweb.roguelike.entity.map.Map;
import org.forweb.roguelike.service.map.MapService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("map")
public class MapController extends AbstractRestController<Map, MapDao, MapService> {
    
}

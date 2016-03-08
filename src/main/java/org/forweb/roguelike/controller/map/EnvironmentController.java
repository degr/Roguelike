package org.forweb.roguelike.controller.map;

import org.forweb.roguelike.controller.AbstractRestController;
import org.forweb.roguelike.dao.map.EnvironmentDao;
import org.forweb.roguelike.entity.map.Environment;
import org.forweb.roguelike.service.map.EnvironmentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("environment")
public class EnvironmentController extends AbstractRestController<Environment, EnvironmentDao, EnvironmentService> {
    
}

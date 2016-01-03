package org.forweb.roguelike.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Ror on 03.01.2016.
 */
@Controller
public class Test extends AbstractController {
    
    
    @RequestMapping("lol")
    @ResponseBody
    public String lol(){
        return  "aaaa";
    }
}

package org.forweb.roguelike.controller;

import org.forweb.roguelike.dao.UserDao;
import org.forweb.roguelike.entity.User;
import org.forweb.roguelike.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Ror on 03.01.2016.
 */
@Controller
public class Test extends AbstractController {
    
    @Autowired
    private UserDao userDao;
    
    @RequestMapping("lol")
    @ResponseBody
    public String lol(){
        /*User user = userDao.getUserByEmail("admin@admin.admin");
        user.setPassword(user.getPassword() + "1");
        userDao.save(user);
        System.out.println(user);*/
        UserUtils.setUserId(1);
        return  "aaaa";
    }
}

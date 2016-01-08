package org.forweb.roguelike.controller;

import javassist.tools.web.BadHttpRequest;
import org.forweb.roguelike.dao.UserDao;
import org.forweb.roguelike.entity.User;
import org.forweb.roguelike.service.UserService;
import org.forweb.roguelike.utils.UserUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("user")
public class UserController extends AbstractRestController<User, UserDao, UserService> {


    @RequestMapping(method = RequestMethod.POST, value = "/login")
    @ResponseBody
    public User login(@RequestBody User item) throws BadHttpRequest {
        User thisUser = service.getUserByEmail(item.getEmail());
        if (thisUser == null) {
            return null;
        }
        UserUtils.setUserId(thisUser.getId());
        return thisUser.getPassword().equals(item.getPassword()) ? thisUser : null;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/is-authorised")
    @ResponseBody
    public User isAuthorised() throws BadHttpRequest {
        Integer userId = UserUtils.getUserId();
        if(userId != null) {
            return service.findOne(userId);
        } else {
            return new User();
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/logout")
    @ResponseBody
    public Boolean logout() throws BadHttpRequest {
        Integer userId = UserUtils.getUserId();
        if(userId != null) {
            UserUtils.setUserId(null);
            return true;
        } else {
            return false;
        }
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/get-by-email")
    @ResponseBody
    public Boolean isUserExist(@RequestBody User item) {
        return service.getUserByEmail(item.getEmail()) != null;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Integer create(@RequestBody User item) throws BadHttpRequest {
        Integer out = super.create(item);
        UserUtils.setUserId(out);
        return out;
    }
}

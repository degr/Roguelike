package org.forweb.roguelike.service;

import org.forweb.roguelike.dao.UserDao;
import org.forweb.roguelike.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractService<User, UserDao> {
    public User getUserByEmail(String email){
        return dao.getUserByEmail(email);
    }
}

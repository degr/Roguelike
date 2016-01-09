package org.forweb.roguelike.utils;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

/**
 * Created by rsmirnou on 10/13/2015. 36
 */
@Service
public class UserUtils {

   /* @Autowired
    private RoleService rs;

    @PostConstruct
    public void postConstruct () {
        roleService = rs;
    }*/

    /*
        public static boolean can(String canSeeUsers) {
            return roleService.can(getUserId(), canSeeUsers);
        }*/
    
    public static String SESSION_KEY_USER_ID = "userId";

    public static Integer getUserId() {
        Object out = Utils.getSession().getAttribute(SESSION_KEY_USER_ID);
        if(out == null) {
            return null;
        } else if(out instanceof Integer) {
            return (Integer) out;
        } else {
            throw new RuntimeException("User id was not properly instantiated.");
        }
    }

    public static void setUserId(Integer userId) {
        Utils.getSession().setAttribute(SESSION_KEY_USER_ID, userId);
    }
    
}

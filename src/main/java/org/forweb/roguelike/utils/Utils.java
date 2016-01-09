package org.forweb.roguelike.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

/**
 * Created by Ror on 03.01.2016.
 */
public class Utils {


    public static HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true); // true == allow create
    }

    public static String removeTrailingSlash(String value){
        return value.replaceAll("^(\\/{1,})|(\\/{1,})$", "");
    }
}

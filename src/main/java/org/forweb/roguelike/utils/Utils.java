package org.forweb.roguelike.utils;

/**
 * Created by Ror on 03.01.2016.
 */
public class Utils {


    public static String removeTrailingSlash(String value){
        return value.replaceAll("^(\\/{1,})|(\\/{1,})$", "");
    }
}

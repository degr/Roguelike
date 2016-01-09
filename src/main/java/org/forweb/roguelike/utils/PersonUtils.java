package org.forweb.roguelike.utils;

import javax.servlet.http.HttpSession;

/**
 * Created by Ror on 09.01.2016.
 */
public class PersonUtils {
    
    public static final String PERSON_ID = "personId";
    
    public static Integer getPersonId(){
        Object out = Utils.getSession().getAttribute(PERSON_ID);
        if(out == null) {
            return null;
        } else if(out instanceof Integer) {
            return (Integer) out;
        } else {
            throw new RuntimeException("Person id was not properly instantiated.");
        }
    }

    public static void setPersonId(Integer personId){
        Utils.getSession().setAttribute(PERSON_ID, personId);
    }


}

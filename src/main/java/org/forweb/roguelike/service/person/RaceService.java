package org.forweb.roguelike.service.person;

import org.apache.commons.lang3.StringUtils;
import org.forweb.roguelike.entity.person.Race;
import org.forweb.roguelike.utils.ClassUtils;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RaceService {

    private Map<String, Race> races;
    
    public List<String> getRacesList() {
        return getRaces().entrySet().stream()
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());
    }


    @SuppressWarnings("unchecked")
    public Race getRace(String raceName) throws Exception {
        if(!getRaces().containsKey(raceName)) {
            Class clazz = ClassUtils.getClass("", StringUtils.capitalize(raceName));
            if(clazz == null)return null;
            Method method = clazz.getMethod("getInstance");
            getRaces().put(raceName, (Race)method.invoke(null));
        }
        return getRaces().get(raceName);
    }


    public Map<String, Race> getRaces(){
        if(races == null) {
            races = new HashMap<>();
        }
        return races;
    }
}

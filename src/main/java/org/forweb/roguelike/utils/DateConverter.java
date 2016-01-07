package org.forweb.roguelike.utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by rsmirnou on 9/18/2015. 05
 */
public class DateConverter {
    public static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static class Serializer implements JsonSerializer {

        @Override
        public JsonElement serialize(Object src, Type typeOfSrc, JsonSerializationContext context) {
            Date date = (Date) src;
            return new JsonPrimitive(DATE_FORMATTER.format(date));
        }
    }
}

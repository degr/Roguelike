package org.forweb.roguelike.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class BooleanDeserializer extends JsonDeserializer<Boolean> {
    
    @Override
    public Boolean deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        JsonToken t = jsonParser.getCurrentToken();
        if (t == JsonToken.VALUE_TRUE) {
            return Boolean.TRUE;
        }
        if (t == JsonToken.VALUE_NUMBER_INT) {
            return (jsonParser.getIntValue() == 1);
        }
        if (t == JsonToken.VALUE_STRING) {
            String text = jsonParser.getText().trim();
            if ("true".equals(text)) {
                return Boolean.TRUE;
            }
            if ("TRUE".equals(text)) {
                return Boolean.TRUE;
            }
            if ("Y".equalsIgnoreCase(text)) {
                return Boolean.TRUE;
            }
        }
        return Boolean.FALSE;
    }
}

package org.forweb.roguelike.service.map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.forweb.roguelike.dao.map.MapDao;
import org.forweb.roguelike.entity.map.Map;
import org.forweb.roguelike.entity.map.MapObject;
import org.forweb.roguelike.map.Cell;
import org.forweb.roguelike.map.WorldMap;
import org.forweb.roguelike.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * Created by Ror on 28.02.2016.
 */
@Service
public class MapService extends AbstractService<Map, MapDao> {
    
    @Autowired
    MapObjectService mapObjectService;
    
    public WorldMap getWorldMap(Integer mapId) throws IOException {
        Map map = findOne(mapId);
        ObjectMapper mapper = new ObjectMapper();
        Cell[][] data = mapper.readValue(map.getJsonMap(), Cell[][].class);
        return new WorldMap(data);
    }
    
    public Boolean isMapExist(String name) {
        return dao.findByName(name) != null;
    }
    
    public WorldMap createMap(String name, Integer width, Integer height) throws Exception {
        if(isMapExist(name)) {
            throw new Exception("Can't create map, because name is not unique");
        }
        WorldMap worldMap = new WorldMap(width, height);
        List<MapObject> mapObjectsList = mapObjectService.findAll();
        for(int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                
            }
        }
        return worldMap;
    }
    /*public function createMap($x, $y, $name){
    

        $query = "insert into map_manager (map, x, y) values ('".DB::escape($name)."', ".$x.", ".$y.")";
        DB::query($query);
        $queryBase = "insert into ".$prefixedName."(id";

        //add Y count of rows with random objects
        $obj = ORM::load('map_objects', false, null, null, null);
        $keys = array_keys($obj);
        $objLength = count($keys);
        for($i = 1; $i < $y+1; $i++){
            $rvalues = array();
            for($r = 0; $r < $x/3; $r++){
                $rand = rand(1, $x);
                $id = rand(0, $objLength-1);
                $rvalues[$rand] = "'".DB::escape(Map::OBJECT.':'.$obj[$keys[$id]]->getId())."'";
            }
            if(count($rvalues) > 0) {
                $valuesQuery = ', x_'.implode(', x_', array_keys($rvalues)).') VALUES ('.$i.','.implode(',', $rvalues).')';
            } else {
                $valuesQuery = ')VALUES('.$i.')';
            }
            DB::query($queryBase.$valuesQuery);
        }
        return true;
    }*/
}

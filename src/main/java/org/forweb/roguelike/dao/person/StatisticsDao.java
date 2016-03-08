package org.forweb.roguelike.dao.person;

import org.forweb.roguelike.dao.AbstractDao;
import org.forweb.roguelike.entity.person.Statistics;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatisticsDao extends AbstractDao<Statistics> {

    @Query("select s from Statistics as s where type = 'race' and refid = :raceId")
    List<Statistics> getStatisticsForRace(@Param("raceId") Integer raceId);
    
    @Query("select s from Statistics as s where type = 'person' and refid = :personId")
    Statistics getStatisticsForPerson(@Param("personId") Integer personId);
}

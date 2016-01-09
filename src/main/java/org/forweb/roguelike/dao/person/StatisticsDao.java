package org.forweb.roguelike.dao.person;

import org.forweb.roguelike.dao.AbstractDao;
import org.forweb.roguelike.entity.person.Statistics;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatisticsDao extends AbstractDao<Statistics> {

    @Query("select * from statistics where type = 'race' and refid = :raceId")
    List<Statistics> getStatisticsForRace(@Param("raceId") Integer raceId);
    
    @Query("select * from statistics where type = 'person' and refid = :personId")
    Statistics getStatisticsForPerson(@Param("personId") Integer personId);




}

package com.example.cis4900.spring.template.housing.dao;

import com.example.cis4900.spring.template.housing.models.HousingData;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HousingDao extends CrudRepository<HousingData, Integer> {

    @Query("SELECT h FROM HousingData h WHERE h.city = :city")
    List<HousingData> findByCity(@Param("city") String city);

    @Query("SELECT h FROM HousingData h WHERE h.year = :year")
    List<HousingData> findByYear(@Param("year") int year);

    @Query("SELECT h FROM HousingData h WHERE h.city = :city AND h.year = :year")
    List<HousingData> findByCityAndYear(@Param("city") String city, @Param("year") int year);
}

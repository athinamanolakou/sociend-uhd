package com.example.cis4900.spring.template.housing.dao;

import com.example.cis4900.spring.template.housing.models.HousingData;
import com.fasterxml.jackson.annotation.JsonTypeInfo.None;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface HousingDao extends CrudRepository<HousingData, Integer> {

}

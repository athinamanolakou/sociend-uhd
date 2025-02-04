package com.example.cis4900.spring.template.notes.dao;

import com.fasterxml.jackson.annotation.JsonTypeInfo.None;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface UhdDao extends CrudRepository<Integer, Integer> { // Change first "Integer" to the service we use

   
}

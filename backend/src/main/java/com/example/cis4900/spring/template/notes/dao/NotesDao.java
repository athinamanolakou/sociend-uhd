package com.example.cis4900.spring.template.notes.dao;

import com.example.cis4900.spring.template.notes.models.Note;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface NotesDao extends CrudRepository<Note, Integer> {

    @Query("SELECT COUNT(*) FROM Note")
    Integer getCount();

    @Query("SELECT COUNT(n) FROM Note n WHERE n.status = 'DONE'")
    Integer countCompletedNotes();

    @Query("SELECT n FROM Note n WHERE n.dueDate BETWEEN :startDate AND :endDate")
    List<Note> findNotesBetweenDates(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}

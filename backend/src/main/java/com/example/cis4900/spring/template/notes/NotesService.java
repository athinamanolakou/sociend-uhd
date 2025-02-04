package com.example.cis4900.spring.template.notes;

import com.example.cis4900.spring.template.notes.models.Note;

import java.util.List;
import java.time.LocalDate;

public interface NotesService {
    public String addNote(Note newNote);

    public Note getNote(Integer id);

    public String updateNote(Note updatedNote);

    public String deleteNote(Integer id);

    public Iterable<Note> allNotes();

    public Integer count();

    public Integer compCount();

    public List<Note> getNotesBetweenDates(LocalDate startDate, LocalDate endDate);
}

package com.example.cis4900.spring.template.controllers;

import com.example.cis4900.spring.template.notes.NotesService;
import com.example.cis4900.spring.template.notes.models.Note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/api/notes")
public class NotesController {
    private NotesService notesService;

    @Autowired
    NotesController(NotesService notesService) {
        this.notesService = notesService;
    }

    @PostMapping("/add")
    private @ResponseBody String addNote(@RequestBody Note newNote) {
        return notesService.addNote(newNote);
    }

    @GetMapping("/get/{id}")
    private @ResponseBody Note getNote(@PathVariable Integer id) {
        return notesService.getNote(id);
    }

    @PutMapping("/update")
    private @ResponseBody String updateNote(@RequestBody Note updatedNote) {
        return notesService.updateNote(updatedNote);
    }

    @DeleteMapping("/delete/{id}")
    private @ResponseBody String deleteNote(@PathVariable Integer id) {
        return notesService.deleteNote(id);
    }

    @GetMapping("/all")
    private @ResponseBody Iterable<Note> allNotes() {
        return notesService.allNotes();
    }

    @GetMapping("/count")
    private @ResponseBody Integer count() {
        return notesService.count();
    }

    // Endpoint to fetch the count of completed notes
    @GetMapping("/completed/count")
    public ResponseEntity<Integer> getCompletedNotesCount() {
        Integer count = notesService.compCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/due-range")
    public List<Note> getNotesBetweenDueDates(
            @org.springframework.web.bind.annotation.RequestParam String start,
            @org.springframework.web.bind.annotation.RequestParam String end) {
        // parse the String query params into LocalDate
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        return notesService.getNotesBetweenDates(startDate, endDate);
    }
}

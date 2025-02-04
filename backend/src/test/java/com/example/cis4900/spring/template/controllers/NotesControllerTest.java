// package com.example.cis4900.spring.template.controllers;

// import com.example.cis4900.spring.template.notes.NotesService;
// import com.example.cis4900.spring.template.notes.models.Note;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import java.util.Arrays;
// import java.util.NoSuchElementException;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(NotesController.class)
// public class NotesControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private NotesService notesService;

//     @BeforeEach
//     public void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     public void testAddNote() throws Exception {
//         Note newNote = new Note();
//         when(notesService.addNote(any(Note.class))).thenReturn("Saved");

//         mockMvc.perform(post("/api/notes/add")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content("{\"id\":1,\"title\":\"Test Note\"}"))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string("Saved"));

//         verify(notesService, times(1)).addNote(any(Note.class));
//     }
// }

package com.example.cis4900.spring.template.controllers;

import com.example.cis4900.spring.template.notes.NotesService;
import com.example.cis4900.spring.template.notes.models.Note;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(NotesController.class)
public class NotesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotesService notesService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddNote() throws Exception {
        when(notesService.addNote(any(Note.class))).thenReturn("Saved");

        mockMvc.perform(post("/api/notes/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":1,\"title\":\"Test Note\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Saved"));

        verify(notesService, times(1)).addNote(any(Note.class));
    }

    @Test
    public void testGetNote() throws Exception {
        Note note = new Note();
        when(notesService.getNote(1)).thenReturn(note);

        mockMvc.perform(get("/api/notes/get/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").doesNotExist())
                .andExpect(jsonPath("$.title").doesNotExist());

        verify(notesService, times(1)).getNote(1);
    }

    @Test
    public void testUpdateNote() throws Exception {
        when(notesService.updateNote(any(Note.class))).thenReturn("Updated");

        mockMvc.perform(put("/api/notes/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":1,\"title\":\"Updated Note\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Updated"));

        verify(notesService, times(1)).updateNote(any(Note.class));
    }

    @Test
    public void testDeleteNote() throws Exception {
        when(notesService.deleteNote(1)).thenReturn("Deleted");

        mockMvc.perform(delete("/api/notes/delete/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted"));

        verify(notesService, times(1)).deleteNote(1);
    }

    @Test
    public void testAllNotes() throws Exception {
        Note note1 = new Note();
        Note note2 = new Note();
        when(notesService.allNotes()).thenReturn(Arrays.asList(note1, note2));

        mockMvc.perform(get("/api/notes/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

        verify(notesService, times(1)).allNotes();
    }

    @Test
    public void testCount() throws Exception {
        when(notesService.count()).thenReturn(5);

        mockMvc.perform(get("/api/notes/count"))
                .andExpect(status().isOk())
                .andExpect(content().string("5"));

        verify(notesService, times(1)).count();
    }

    @Test
    public void testGetCompletedNotesCount() throws Exception {
        when(notesService.compCount()).thenReturn(3);

        mockMvc.perform(get("/api/notes/completed/count"))
                .andExpect(status().isOk())
                .andExpect(content().string("3"));

        verify(notesService, times(1)).compCount();
    }
}

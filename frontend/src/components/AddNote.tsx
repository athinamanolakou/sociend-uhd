import React, {useState} from 'react';
import {addNote} from '../services/noteService';
import {Note} from '../types/Note';

interface AddNoteProps {
  onNoteAdded: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({onNoteAdded}) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(''); // Store date (YYYY-MM-DD)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Omit<Note, 'id'> = {
      text,
      status: 'NOT STARTED',
      dueDate: dueDate || undefined,
    };

    await addNote(newNote);
    setText('');
    setDueDate(''); // Reset fields
    onNoteAdded(); // Notify parent to refresh
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
        }}
      >
        <label className="label-large">Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your task here"
          style={{
            width: '300px',
            height: '60px',
            padding: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #3a3a3a',
            backgroundColor: '#2b2b2b',
            color: '#ffffff',
            fontSize: '1rem',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
        }}
      >
        <label className="label-large">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: '300px',
            padding: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #3a3a3a',
            backgroundColor: '#2b2b2b',
            color: '#ffffff',
            fontSize: '1rem',
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007bff', // Blue color for the button
          color: '#ffffff',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNote;

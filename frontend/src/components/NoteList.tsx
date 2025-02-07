import React, {useEffect, useState} from 'react';
import {getAllNotes, getCompletedNotesCount, getTotalNotesCount, updateNote} from '../services/noteService';
import {Note} from '../types/Note';

interface NoteListProps {
  refresh: boolean;
}

const NoteList: React.FC<NoteListProps> = ({refresh}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [sortOption, setSortOption] = useState<'None' | 'Due Date'>('None');
  const [sortAscending, setSortAscending] = useState(true);
  const [filterOption, setFilterOption] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotesAndCounts = async () => {
      try {
        const notesFromApi = await getAllNotes();
        const totalCount = await getTotalNotesCount();
        const completedCountResult = await getCompletedNotesCount();

        setNotes(notesFromApi);
        setFilteredNotes(notesFromApi);
        setCompletedCount(completedCountResult);
        setIncompleteCount(totalCount - completedCountResult);
      } catch (err) {
        setError('Failed to fetch notes or counts');
      } finally {
        setLoading(false);
      }
    };

    fetchNotesAndCounts();
  }, [refresh]);

  useEffect(() => {
    let filtered = [...notes];
    if (filterOption) {
      filtered = notes.filter((note) => note.status === filterOption);
    }
    if (sortOption === 'Due Date') {
      filtered.sort((a, b) => {
        if (!a.dueDate || !b.dueDate) return 0;
        return sortAscending
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      });
    }
    setFilteredNotes(filtered);
  }, [filterOption, sortOption, sortAscending, notes]);

  const handleDueDateUpdate = async (id: number, newDueDate: string) => {
    try {
      const noteToUpdate = notes.find((n) => n.id === id);
      if (!noteToUpdate) return;

      const updatedNote: Note = {...noteToUpdate, dueDate: newDueDate};
      await updateNote(updatedNote);

      // Update state with the new due date
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? updatedNote : n))
      );
      setFilteredNotes((prevFiltered) =>
        prevFiltered.map((n) => (n.id === id ? updatedNote : n))
      );
    } catch (err) {
      console.error('Error updating note due date:', err);
      setError('Failed to update note due date.');
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: 'NOT STARTED' | 'IN PROGRESS' | 'DONE') => {
    try {
      const noteToUpdate = notes.find((n) => n.id === id);
      if (!noteToUpdate) return;

      const updatedNote: Note = {...noteToUpdate, status: newStatus};
      await updateNote(updatedNote);

      // Update state with the new status
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? updatedNote : n))
      );
      setFilteredNotes((prevFiltered) =>
        prevFiltered.map((n) => (n.id === id ? updatedNote : n))
      );
    } catch (err) {
      console.error('Error updating note status:', err);
      setError('Failed to update note status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Notes List</h2>
      <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem'}}>
        <p>Completed Notes: {completedCount}</p>
        <p>Incomplete Notes: {incompleteCount}</p>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
        <div>
          <label>
            Sort By:
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'None' | 'Due Date')}
              style={{marginLeft: '0.5rem'}}
            >
              <option value="None">None</option>
              <option value="Due Date">Due Date</option>
            </select>
          </label>
          {sortOption === 'Due Date' && (
            <button
              onClick={() => setSortAscending(!sortAscending)}
              style={{
                marginLeft: '1rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '5px',
                backgroundColor: '#3a3a3a',
                color: '#fff',
                border: 'none',
              }}
            >
              {sortAscending ? 'Ascending' : 'Descending'}
            </button>
          )}
        </div>

        <div>
          <label>
            Filter By:
            <select
              value={filterOption || ''}
              onChange={(e) => setFilterOption(e.target.value || null)}
              style={{marginLeft: '0.5rem'}}
            >
              <option value="">All</option>
              <option value="NOT STARTED">Not Started</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </label>
        </div>
      </div>

      <ul
        style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        {filteredNotes.map((note) => {
          let borderColor = '#2b2b2b';
          if (note.status === 'NOT STARTED') borderColor = '#e57373';
          if (note.status === 'IN PROGRESS') borderColor = '#ffeb3b';
          if (note.status === 'DONE') borderColor = '#66bb6a';

          return (
            <li
              key={note.id}
              style={{
                backgroundColor: '#2b2b2b',
                borderRadius: '10px',
                padding: '1rem',
                width: '200px',
                textAlign: 'left',
                color: '#ffffff',
                border: `2px solid ${borderColor}`,
              }}
            >
              <p>{note.text}</p>
              <p>
                <strong>Due Date:</strong>{' '}
                <input
                  type="date"
                  value={note.dueDate || ''}
                  onChange={(e) => handleDueDateUpdate(note.id, e.target.value)}
                />
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <select
                  value={note.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      note.id,
                      e.target.value as 'NOT STARTED' | 'IN PROGRESS' | 'DONE'
                    )
                  }
                >
                  <option value="NOT STARTED">Not Started</option>
                  <option value="IN PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;

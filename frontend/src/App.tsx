import React, { useState } from 'react';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import DisplayDate from './components/DisplayDate'; // Keep DisplayDate
import AddInstruct from './components/AddInstruct'; // Keep AddInstruct

const App: React.FC = () => {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const triggerRefresh = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>TODO Notes Application</h1>
      <DisplayDate /> {/* Added DisplayDate */}
      <AddInstruct /> {/* Keep AddInstruct */}
      <AddNote onNoteAdded={triggerRefresh} /> {/* Pass trigger function to AddNote */}
      <NoteList refresh={refreshNotes} /> {/* Pass refresh state to NoteList */}
    </div>
  );
};

export default App;

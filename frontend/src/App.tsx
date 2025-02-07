import React, {useState} from 'react';

const App: React.FC = () => {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const triggerRefresh = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Urban Housing Demand</h1>
    </div>
  );
};

export default App;

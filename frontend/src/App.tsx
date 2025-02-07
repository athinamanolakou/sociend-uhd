import React, {useState} from 'react';
import ProductPitch from './components/ProductPitch';

const App: React.FC = () => {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const triggerRefresh = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <div className="App">
      <ProductPitch />
    </div>
  );
};

export default App;

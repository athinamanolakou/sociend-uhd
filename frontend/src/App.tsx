import React, {useState} from 'react';
import ProductPitch from './components/ProductPitch';
import HousingGraph from './components/HousingGraph';

const App: React.FC = () => {
  return (
    <div className="App">
      <HousingGraph />
    </div>
  );
};

export default App;

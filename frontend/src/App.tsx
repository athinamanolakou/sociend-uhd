import React from 'react';
import HousingGraph from './components/HousingGraph';
import HousingStartsGraph from './components/HousingStartsGraph';

const App: React.FC = () => {
  return (
    <div className="App">
      <HousingGraph />
      <HousingStartsGraph />
    </div>
  );
};

export default App;

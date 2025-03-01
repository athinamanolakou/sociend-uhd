import React from 'react';
import HousingGraph from './components/HousingCompletionRatio';
import HousingStartsGraph from './components/HousingTotalStartsCompletions';

const App: React.FC = () => {
  return (
    <div className="App">
      <HousingGraph />
      <HousingStartsGraph />
    </div>
  );
};

export default App;

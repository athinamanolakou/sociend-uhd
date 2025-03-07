import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HousingCompletionRatio from './components/HousingCompletionRatio';
import HousingTotalStartsCompletions from './components/HousingTotalStartsCompletions';
import ProductPitch from './components/ProductPitch';
import LabourMarket from './components/LabourMarket';

const App: React.FC = () => {
  const [page, setPage] = useState<'pitch' | 'starts' | 'labour'>('pitch');

  return (
    <div className="App">
      <Navbar setPage={setPage} />

      {page === 'pitch' && <ProductPitch />}
      
      {page === 'starts' && (
        <>
          <HousingCompletionRatio />
          <HousingTotalStartsCompletions />
        </>
      )}   
      {page === 'labour' && <LabourMarket />}
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HousingGraph from './components/HousingGraph';
import HousingStartsGraph from './components/HousingStartsGraph';
import ProductPitch from './components/ProductPitch';
import LabourMarket from './components/LabourMarket';

const App: React.FC = () => {
  const [page, setPage] = useState<'pitch' | 'starts' | 'labour'>('pitch');

  return (
    <div className="App">
      <Navbar setPage={setPage} />

      {page === 'pitch' && <ProductPitch />}
      
      {/* ✅ FIX: Add missing curly braces here */}
      {page === 'starts' && (
        <>
          <HousingGraph />
          <HousingStartsGraph />
        </>
      )}   
      {page === 'labour' && <LabourMarket />}
    </div>
  );
};

export default App;
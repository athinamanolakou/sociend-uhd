import React, {useState} from 'react';
import Navbar from './components/Navbar';
import HousingCompletionRatio from './components/HousingCompletionRatio';
import HousingTotalStartsCompletions from './components/HousingTotalStartsCompletions';
import ProductPitch from './components/ProductPitch';
import LabourMarketOccupationsHamilton from './components/LabourMarketOccupationsHamilton';
import LabourMarketOccupationsToronto from './components/LabourMarketOccupationsToronto';
import LabourMarketFamilyTypeHamilton from './components/LabourMarketFamilyTypeHamilton';
import LabourMarketFamilyTypeToronto from './components/LabourMarketFamilyTypeToronto';

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
      {page === 'labour' && (
        <>
          <LabourMarketOccupationsHamilton />
          <LabourMarketOccupationsToronto />
          <LabourMarketFamilyTypeHamilton />
          <LabourMarketFamilyTypeToronto />
        </>
      )}
    </div>
  );
};

export default App;
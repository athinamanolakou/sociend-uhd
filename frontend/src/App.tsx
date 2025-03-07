import React, {useState} from 'react';
import Navbar from './components/Navbar';
import HousingGraph from './components/HousingGraph';
import HousingStartsGraph from './components/HousingStartsGraph';
import ProductPitch from './components/ProductPitch';
import LabourMarketOccupationsHamilton from './components/LabourMarketOccupationsHamilton';
import LabourMarketOccupationsToronto from './components/LabourMarketOccupationsToronto';

const App: React.FC = () => {
  const [page, setPage] = useState<'pitch' | 'starts' | 'labour'>('pitch');

  return (
    <div className="App">
      <Navbar setPage={setPage} />

      {page === 'pitch' && <ProductPitch />}

      {page === 'starts' && (
        <>
          <HousingGraph />
          <HousingStartsGraph />
        </>
      )}
      {page === 'labour' && (
        <>
          <LabourMarketOccupationsHamilton />
          <LabourMarketOccupationsToronto />
        </>
      )}
    </div>
  );
};

export default App;
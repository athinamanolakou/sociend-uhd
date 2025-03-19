import React, {useState} from 'react';
import Navbar from './components/Navbar';
import HousingCompletionRatio from './components/HousingCompletionRatio';
import HousingStartsCompletionsToronto from './components/HousingStartsCompletionsToronto';
import HousingtartsCompletionsHamilton from './components/HousingStartsCompletionsHamilton';
import ProductPitch from './components/ProductPitch';
import LabourMarketOccupationsHamilton from './components/LabourMarketOccupationsHamilton';
import LabourMarketOccupationsToronto from './components/LabourMarketOccupationsToronto';
import LabourMarketFamilyTypesHamilton from './components/LabourMarketFamilyTypesHamilton';
import LabourMarketFamilyTypesToronto from './components/LabourMarketFamilyTypesToronto';
import HousingVsImmigration from "./components/HousingVsImmigration";


const App: React.FC = () => {
  const [page, setPage] = useState<'pitch' | 'starts' | 'labour' | 'compare'>('pitch');

  return (
    <div className="App">
      <Navbar setPage={setPage} />

      {page === 'pitch' && <ProductPitch />}

      {page === 'starts' && (
        <>
          <HousingCompletionRatio />
          <HousingtartsCompletionsHamilton />
          <HousingStartsCompletionsToronto />
        </>
      )}
      {page === 'labour' && (
        <>
          <LabourMarketOccupationsHamilton />
          <LabourMarketOccupationsToronto />
          <LabourMarketFamilyTypesHamilton />
          <LabourMarketFamilyTypesToronto />
        </>
      )}

      {page === 'compare' && (
          <>
              <h1>Comparing Housing and Labour Data</h1>
              <p>This page compares housing starts with labour market data to analyze housing demand.</p>
              <HousingVsImmigration />  
          </>
      )}
      
    </div>
  );
};

export default App;
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

import { ThemeProvider } from './ThemeContext';


const App: React.FC = () => {
  const [page, setPage] = useState<"pitch" | "starts" | "labour" | "compare">("pitch");
  
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar setPage={setPage} />
        {page === "pitch" && <ProductPitch />}
        {page === "starts" && (
          <>
            <HousingCompletionRatio />
            <HousingtartsCompletionsHamilton />
            <HousingStartsCompletionsToronto />
          </>
        )}
        {page === "labour" && (
          <>
            <LabourMarketOccupationsHamilton />
            <LabourMarketOccupationsToronto />
            <LabourMarketFamilyTypesHamilton />
            <LabourMarketFamilyTypesToronto />
          </>
        )}

        {page === "compare" && (
          <>
            <HousingVsImmigration />  
          </>
        )}

      </div>
    </ThemeProvider>
  );
};

export default App;
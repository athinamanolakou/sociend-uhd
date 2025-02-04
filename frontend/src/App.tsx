import React, {useState} from 'react';
import ProductPitch from './components/ProductPitch';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Urban Housing Development</h1>
      <ProductPitch />
    </div>
  );
};

export default App;

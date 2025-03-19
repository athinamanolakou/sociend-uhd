import React from 'react';

interface NavbarProps {
  setPage: (page: 'pitch' | 'starts' | 'labour' | 'compare') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px', backgroundColor: '#1f1f1f' }}>
      <button onClick={() => setPage('pitch')}>Product Pitch</button>
      <button onClick={() => setPage('starts')}>Starts & Completions</button>
      <button onClick={() => setPage('labour')}>Labour Market</button>
      <button onClick={() => setPage('compare')}>Comparing Housing and Labour Data</button>

    </nav>
  );
};

export default Navbar;
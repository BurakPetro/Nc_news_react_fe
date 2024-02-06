import { useState } from 'react';
import DisplaySection from './componets/DisplaySection';
import './App.css';

function App() {
  return (
    <>
      <header>Nc News</header>
      <div className="display-section">
        <DisplaySection />
      </div>
    </>
  );
}

export default App;

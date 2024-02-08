import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Topics from './componets/Topics';
import Article from './componets/Article';
import Err from './componets/Err';
import { ErrProvider } from './contexts/ErrContext';

function App() {
  return (
    <>
      <header>Nc News</header>
      <ErrProvider>
        <Routes>
          <Route path="/" element={<Topics />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/err" element={<Err />} />
        </Routes>
      </ErrProvider>
    </>
  );
}

export default App;

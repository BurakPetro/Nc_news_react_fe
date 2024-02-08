import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Topics from './componets/Topics';
import Article from './componets/Article';
function App() {
  return (
    <>
      <header>Nc News</header>
      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;

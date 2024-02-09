import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Topics from './componets/Topics';
import Article from './componets/Article';
import Err from './componets/Err';
import { ErrProvider } from './contexts/ErrContext';
import { ActiveUserProvider } from './contexts/ActiveUser';
import LoginUser from './componets/LoginUser';

function App() {
  return (
    <>
      <ErrProvider>
        <ActiveUserProvider>
          <header>
            Nc News
            <LoginUser />
          </header>
          <Routes>
            <Route path="/" element={<Topics />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/err" element={<Err />} />
          </Routes>
        </ActiveUserProvider>
      </ErrProvider>
    </>
  );
}

export default App;

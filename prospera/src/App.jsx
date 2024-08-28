import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LearnPage from './pages/Learn'
import GamePage from './pages/GamePage'
import Navbar from './pages/NavBar';

function App() {

  return (
<>

<Router>
    <Navbar/>
     <Routes>
        <Route path="/" element={<LearnPage />} />
        <Route path="/game/:topic" element={<GamePage />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App

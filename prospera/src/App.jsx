import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LearnPage from './pages/Learn'
import GamePage from './pages/GamePage'

function App() {

  return (
<>
{/* <LearnPage/> */}
<Router>
    
     <Routes>
        <Route path="/" element={<LearnPage />} />
        <Route path="/game/:topic" element={<GamePage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

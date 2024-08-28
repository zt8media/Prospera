import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Learn from './pages/Learn';
import GamePage from './pages/GamePage';
import Navbar from './components/NavBar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {

  return (
<>


<BrowserRouter>
  <Navbar />

     <Routes>
        <Route path="/Home" element= {<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Learn" element={<Learn />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/game/:topic" element={<GamePage />} />
      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App

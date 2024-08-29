import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Learn from './pages/Learn';
import GamePage from './pages/GamePage';
import Navbar from './components/NavBar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin';
// import Home from './pages/Home';


function App() {

  return (
<>


<BrowserRouter>
  <Navbar />

     <Routes>
        {/* <Route path="/Home" element= {<Home />} /> */}
        <Route path="/About" element={<About />} />
        <Route path="/Learn" element={<Learn />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/game/:topic" element={<GamePage />} />
        <Route path="/Admin" element={<AdminDashboard />} />
      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App

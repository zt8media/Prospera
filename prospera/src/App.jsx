import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Learn from './pages/Learn';
import BudgetingGamePage from './pages/BudgetingGamePage';
import SavingGamePage from './pages/SavingGamePage';
import InvestingGamePage from './pages/InvestingGamePage';
import SpendingGamePage from './pages/SpendingGamePage';
import Navbar from './components/NavBar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (

    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
         <Route path="/*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          
          {/* Individual game routes */}
          <Route path="/game/budgeting" element={<BudgetingGamePage />} />
          <Route path="/game/saving" element={<SavingGamePage />} />
          <Route path="/game/investing" element={<InvestingGamePage />} />
          <Route path="/game/spending-wisley" element={<SpendingGamePage />} />
        </Routes>
     <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;

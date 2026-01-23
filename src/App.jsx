import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Home';
import Goalkeepers from './pages/Goalkeepers';
import GoalkeeperProfile from './pages/GoalkeeperProfile';
import AboutAllianceKenya from './pages/About';
import Clubs from './pages/Clubs';
import AwardsPage from './pages/Awards';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow pt-0">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/goalkeepers" element={<Goalkeepers />} />
            <Route path="/goalkeepers/:id" element={<GoalkeeperProfile />} />
            <Route path="/about" element={<AboutAllianceKenya />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/awards" element={<AwardsPage />} />
            {/* <Route path="/leagues" element={<Leagues />} /> */}
            {/* <Route path="/game-tickets" element={<Tickets />} />  */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>

  )
}

export default App



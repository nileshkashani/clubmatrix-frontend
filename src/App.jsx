import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Clubs from './components/Clubs';
import AddClub from './components/AddClub';
import LeaderDashboard from './components/LeaderDashboard';
import JoinedClubs from './components/JoinedClubs';
import About from './components/About';
import Features from './components/Features';
import Guide from './components/Guide';
 

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="app-container font-poppins">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/add-your-club" element={<AddClub />} />
          <Route path='/joined-clubs' element={<JoinedClubs />} />
          <Route path="/dashboard" element={<LeaderDashboard />} />
          <Route path='/about' element={<About />}/>
          <Route path='/features' element = {<Features/>}></Route>
          <Route path='/guide' element = {<Guide/>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

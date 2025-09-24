import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Tutorial from './Tutorial';
import About from './About'

const Home = () => {
  const navigate = useNavigate();
  const [isClubLeader, setIsClubLeader] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const checkIfLeader = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.id) {
          setIsClubLeader(false);
          return;
        }

        const leaderId = user.id;
        const res = await axios.get(`https://cm-backend-production-642e.up.railway.app/club/get/by/leader/${leaderId}`);

        if (res.data) {
          setIsClubLeader(true);
        } else {
          setIsClubLeader(false);
        }
      } catch (err) {
        console.error("Error checking leader:", err);
        setMessage({ type: 'error', text: 'Failed to check club leader status' });
        setIsClubLeader(false);
      }
    };

    checkIfLeader();
  }, []);

  return (
    <div className="bg-[#0d1117] min-h-screen flex flex-col text-white overflow-x-hidden shadow-xl">


      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center md:gap-20 lg:gap-32 px-6 py-12 md:py-0 min-h-screen w-full">

        {/* Left Content (main content) */}
        <div className="flex flex-col space-y-6 text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Connecting School Clubs,<br /> Empowering Communities & Organisations.
          </h1>
          <p className="text-gray-400 text-lg">
            A platform that supports your goals as a member or leader of your club.
          </p>

          {message.text && (
            <div
              className={`p-3 rounded-md text-sm md:text-base w-full max-w-md ${message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-center md:justify-start gap-4">
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-all"
              onClick={() => navigate("/clubs")}
            >
              Explore Clubs
            </button>

            {isClubLeader ? (
              <button
                className="px-6 py-3 bg-transparent hover:bg-black/15 border-[1px] border-white text-white rounded-md shadow-md transition-all"
                onClick={() => navigate("/dashboard")}
              >
                Your Club
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-transparent hover:bg-black/15 border-[1px] border-white text-white rounded-md shadow-md transition-all"
                onClick={() => navigate("/add-your-club")}
              >
                Add Your Club
              </button>
            )}
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="mt-10 md:mt-0 md:ml-8 flex justify-center items-center max-w-full overflow-hidden">

          {/* Desktop Illustration */}
          <div className="hidden md:block relative w-80 h-96">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl transform rotate-12 animate-pulse"></div>
            <div className="absolute top-8 left-4 w-64 h-32 bg-yellow-400 rounded-xl shadow-xl transform rotate-6"></div>
            <div className="absolute top-28 left-8 w-56 h-28 bg-green-400 rounded-xl shadow-xl transform -rotate-6"></div>
            <div className="absolute top-48 left-16 w-40 h-20 bg-blue-400 rounded-xl shadow-xl transform rotate-12"></div>
          </div>
        </div>
      </div>

      <About/>
     
      <Tutorial />

      <Footer />  
    </div>
  );
};

export default Home;

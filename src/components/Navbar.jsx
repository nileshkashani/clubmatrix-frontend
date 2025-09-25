import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(localStorage.getItem("isAuthenticated") === 'true');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setLogin(localStorage.getItem('isAuthenticated') === 'true');
    };
  }, []);

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/register');
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem("user");
    setLogin(false);
    navigate('/');
  };

  return (
    <nav className="bg-black/30 shadow-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div
            className="text-3xl font-bold text-white tracking-wide cursor-pointer"
            onClick={() => navigate('/')}
          >
            Club Matrix
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl transition-all duration-300 ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-xl transition-all duration-300 ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/joined-clubs"
              className={({ isActive }) =>
                `text-xl transition-all duration-300 ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`
              }
            >
              Joined Clubs
            </NavLink>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {!login ? (
              <>
                <button
                  className="px-4 py-1 text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="px-4 py-1 text-xl text-gray-300 rounded-md hover:text-white transition-colors duration-300"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="px-4 py-1 text-xl text-white rounded-md transition-colors duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/70 w-full px-4 py-4 space-y-2">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block text-lg ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Home
          </NavLink>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block text-lg ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Profile
          </NavLink>
          <NavLink to="/joined-clubs" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block text-lg ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Joined Clubs
          </NavLink>

          {!login ? (
            <>
              <button className="w-full text-left text-lg text-white py-1" onClick={() => { handleLogin(); setMenuOpen(false); }}>Login</button>
              <button className="w-full text-left text-lg text-gray-300 py-1" onClick={() => { handleSignup(); setMenuOpen(false); }}>Sign Up</button>
            </>
          ) : (
            <button className="w-full text-left text-lg text-red-600 py-1" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

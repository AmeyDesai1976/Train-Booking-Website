import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Train, User, Menu, X, LogOut, Settings, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsProfileOpen(false);
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Train Schedule', path: '/schedule' },
    { name: 'PNR Status', path: '/pnr-status' },
    { name: 'Book Ticket', path: '/search' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
              <Train className="w-8 h-8 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">RailBooker</h1>
              <p className="text-xs text-blue-100">Indian Railways</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white dark:text-gray-200 hover:text-orange-200 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-300 dark:bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-orange-300 dark:bg-gray-700 dark:text-orange-400 hover:bg-gray-800 hover:text-orange-400 transition-colors duration-200"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium hidden md:block">
                    {userProfile?.full_name || 'User'}
                  </span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-800">Profile</span>
                      </Link>
                      <Link
                        to="/bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-800">My Bookings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-red-600">Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-white hover:text-orange-200 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-orange-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-blue-900/95 dark:bg-gray-900 backdrop-blur-sm"
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white dark:text-gray-200 hover:text-orange-200 dark:hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="mt-2 px-3 py-2 rounded-md text-base font-medium bg-gray-900 text-orange-300 dark:bg-gray-700 dark:text-orange-400 hover:bg-gray-800 hover:text-orange-400 transition-colors duration-200 w-full"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Clock, ArrowRight, Train, Users, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

export const Home: React.FC = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    journeyDate: format(new Date(), 'yyyy-MM-dd'),
    seatClass: 'SL'
  });
  const [stations, setStations] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);

  useEffect(() => {
    fetchStations();
    loadRecentSearches();
  }, []);

  const fetchStations = async () => {
    try {
      const { data, error } = await supabase
        .from('stations')
        .select('*')
        .order('station_name');

      if (error) throw error;
      setStations(data || []);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const handleSearch = () => {
    if (searchData.from && searchData.to && searchData.journeyDate) {
      // Save to recent searches
      const newSearch = {
        from: searchData.from,
        to: searchData.to,
        date: searchData.journeyDate,
        timestamp: new Date().toISOString()
      };
      
      const updated = [newSearch, ...recentSearches.slice(0, 4)];
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      // Navigate to search results
      window.location.href = `/search?from=${searchData.from}&to=${searchData.to}&date=${searchData.journeyDate}&class=${searchData.seatClass}`;
    }
  };

  const swapStations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Book tickets in seconds with our lightning-fast booking system"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Get help anytime with our round-the-clock customer support"
    },
    {
      icon: <Train className="w-8 h-8" />,
      title: "Live Updates",
      description: "Real-time train status and platform information"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-orange-100 animate-gradient-x">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 animate-gradient-y">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>
        {/* Floating Lucide Icons */}
        <div className="absolute top-10 left-10 animate-float-slow opacity-30"><Train className="w-24 h-24 text-orange-400" /></div>
        <div className="absolute bottom-10 right-10 animate-float-fast opacity-30"><MapPin className="w-20 h-20 text-blue-400" /></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white drop-shadow-xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              Book Your Railway Journey
              <span className="block text-orange-300 animate-pulse">With Confidence</span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-14 max-w-3xl mx-auto font-light">
              Experience seamless train booking with real-time availability, instant confirmations, and secure payments
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {/* From Station */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  From
                </label>
                <select
                  value={searchData.from}
                  onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select departure city</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.station_code}>
                      {station.station_name} ({station.station_code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex items-end justify-center lg:justify-center">
                <button
                  onClick={swapStations}
                  className="p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200"
                >
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </button>
              </div>

              {/* To Station */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  To
                </label>
                <select
                  value={searchData.to}
                  onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select destination city</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.station_code}>
                      {station.station_name} ({station.station_code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
              {/* Journey Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Journey Date
                </label>
                <input
                  type="date"
                  value={searchData.journeyDate}
                  onChange={(e) => setSearchData(prev => ({ ...prev, journeyDate: e.target.value }))}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Seat Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seat Class
                </label>
                <select
                  value={searchData.seatClass}
                  onChange={(e) => setSearchData(prev => ({ ...prev, seatClass: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="SL">Sleeper (SL)</option>
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                  <option value="1A">AC First Class (1A)</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl hover:scale-105 hover:shadow-2xl border-2 border-orange-300"
                >
                  <Search className="w-6 h-6 animate-bounce" />
                  <span className="tracking-wide">Search Trains</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto mt-10"
            >
              <h3 className="text-white text-xl font-bold mb-6 drop-shadow-lg">Recent Searches</h3>
              <div className="flex flex-wrap gap-4">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchData({
                      from: search.from,
                      to: search.to,
                      journeyDate: search.date,
                      seatClass: 'SL'
                    })}
                    className="bg-white/30 hover:bg-white/50 text-blue-900 px-6 py-3 rounded-xl text-base font-semibold transition-colors duration-200 backdrop-blur-lg shadow-lg hover:scale-105 border border-blue-200"
                  >
                    <MapPin className="w-4 h-4 inline mr-1 text-blue-500" />
                    {search.from} <ArrowRight className="w-4 h-4 inline mx-1 text-orange-500" /> {search.to}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Why Choose RailBooker?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Experience the most advanced railway booking platform with cutting-edge features designed for modern travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100 group hover:-translate-y-2 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl w-fit mb-6 group-hover:scale-125 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-24 bg-gradient-to-r from-blue-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Quick Actions
            </h2>
            <p className="text-2xl text-gray-600 font-light">
              Access frequently used services with a single click
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'PNR Status',
                description: 'Check your booking status and journey details',
                path: '/pnr-status',
                color: 'from-blue-500 to-blue-600',
                icon: <Search className="w-10 h-10 animate-float-fast" />
              },
              {
                title: 'Train Schedule',
                description: 'View train timings and route information',
                path: '/schedule',
                color: 'from-green-500 to-green-600',
                icon: <Clock className="w-10 h-10 animate-float-slow" />
              },
              {
                title: 'Seat Availability',
                description: 'Check real-time seat availability',
                path: '/seat-availability',
                color: 'from-purple-500 to-purple-600',
                icon: <Users className="w-10 h-10 animate-float-slow" />
              }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={action.path}
                  className={`block bg-gradient-to-br ${action.color} text-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 hover:scale-105 border-2 border-blue-200`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="group-hover:scale-125 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{action.title}</h3>
                  <p className="text-blue-100 text-lg font-light">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
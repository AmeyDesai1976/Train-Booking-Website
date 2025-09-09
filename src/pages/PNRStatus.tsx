import React, { useState } from 'react';
import { Search, Train, MapPin, Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PNRStatus: React.FC = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrData, setPnrData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      setError('Please enter a valid 10-digit PNR number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock PNR data
      const mockData = {
        pnr: pnrNumber,
        trainNumber: '12951',
        trainName: 'Mumbai Rajdhani Express',
        from: 'New Delhi',
        to: 'Mumbai Central',
        fromCode: 'NDLS',
        toCode: 'BCT',
        journeyDate: '2024-01-15',
        departureTime: '16:55',
        arrivalTime: '08:35+1',
        duration: '15h 40m',
        class: 'AC 3 Tier (3A)',
        status: 'Confirmed',
        chartStatus: 'Chart Prepared',
        passengers: [
          {
            name: 'John Doe',
            age: 30,
            gender: 'Male',
            berth: 'S1-25 (Side Lower)',
            status: 'Confirmed'
          },
          {
            name: 'Jane Doe',
            age: 28,
            gender: 'Female',
            berth: 'S1-26 (Side Upper)',
            status: 'Confirmed'
          }
        ],
        bookingDate: '2024-01-10',
        totalFare: 2560
      };

      setPnrData(mockData);
      setLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'waitlisted':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'waitlisted':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PNR Status Check
          </h1>
          <p className="text-xl text-gray-600">
            Enter your 10-digit PNR number to check booking status
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PNR Number
              </label>
              <input
                type="text"
                value={pnrNumber}
                onChange={(e) => {
                  setPnrNumber(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Enter 10-digit PNR number"
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Check Status</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* PNR Results */}
        <AnimatePresence>
          {pnrData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">PNR: {pnrData.pnr}</h2>
                      <p className="text-green-100">Booking Status</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(pnrData.status)} text-sm font-semibold`}>
                        {getStatusIcon(pnrData.status)}
                        <span>{pnrData.status}</span>
                      </div>
                      <p className="text-green-100 text-sm mt-2">{pnrData.chartStatus}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Train Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Train className="w-5 h-5 mr-2 text-blue-600" />
                        Train Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Train Name:</span>
                          <span className="font-semibold">{pnrData.trainName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Train Number:</span>
                          <span className="font-semibold">{pnrData.trainNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Class:</span>
                          <span className="font-semibold">{pnrData.class}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Journey Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Journey Date:</span>
                          <span className="font-semibold">{pnrData.journeyDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Departure:</span>
                          <span className="font-semibold">{pnrData.departureTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold">{pnrData.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Route
                    </h3>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{pnrData.departureTime}</p>
                        <p className="text-sm text-gray-600">{pnrData.from}</p>
                        <p className="text-xs text-gray-500">{pnrData.fromCode}</p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center">
                          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                          <div className="mx-2 bg-blue-100 rounded-full p-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-1">{pnrData.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{pnrData.arrivalTime}</p>
                        <p className="text-sm text-gray-600">{pnrData.to}</p>
                        <p className="text-xs text-gray-500">{pnrData.toCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Passenger Details
                    </h3>
                    <div className="space-y-4">
                      {pnrData.passengers.map((passenger: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-2 md:mb-0">
                              <p className="font-semibold text-gray-900">{passenger.name}</p>
                              <p className="text-sm text-gray-600">
                                {passenger.age} years, {passenger.gender}
                              </p>
                            </div>
                            <div className="flex flex-col md:items-end">
                              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(passenger.status)} text-sm font-medium mb-1`}>
                                {getStatusIcon(passenger.status)}
                                <span>{passenger.status}</span>
                              </div>
                              <p className="text-sm font-semibold text-gray-900">
                                Berth: {passenger.berth}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">Booking Date:</span>
                        <span className="ml-2 font-semibold">{pnrData.bookingDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Fare:</span>
                        <span className="ml-2 font-semibold text-green-600">₹{pnrData.totalFare}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample PNR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 mb-2">Don't have a PNR? Try with sample:</p>
          <button
            onClick={() => setPnrNumber('1234567890')}
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            1234567890
          </button>
        </motion.div>
      </div>
    </div>
  );
};
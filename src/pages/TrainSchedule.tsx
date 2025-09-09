import React, { useState, useEffect } from 'react';
import { Search, Clock, MapPin, Calendar, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface Station {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  distance: number;
  day: number;
}

interface TrainSchedule {
  trainNumber: string;
  trainName: string;
  stations: Station[];
}

export const TrainSchedule: React.FC = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [scheduleData, setScheduleData] = useState<TrainSchedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!trainNumber) {
      setError('Please enter a train number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const mockSchedule: TrainSchedule = {
        trainNumber: trainNumber,
        trainName: 'Mumbai Rajdhani Express',
        stations: [
          {
            stationCode: 'NDLS',
            stationName: 'New Delhi',
            arrivalTime: 'Source',
            departureTime: '16:55',
            distance: 0,
            day: 1
          },
          {
            stationCode: 'GZB',
            stationName: 'Ghaziabad',
            arrivalTime: '17:28',
            departureTime: '17:30',
            distance: 24,
            day: 1
          },
          {
            stationCode: 'MB',
            stationName: 'Moradabad',
            arrivalTime: '19:03',
            departureTime: '19:08',
            distance: 164,
            day: 1
          },
          {
            stationCode: 'BE',
            stationName: 'Bareilly',
            arrivalTime: '19:58',
            departureTime: '20:01',
            distance: 252,
            day: 1
          },
          {
            stationCode: 'LKO',
            stationName: 'Lucknow',
            arrivalTime: '22:00',
            departureTime: '22:10',
            distance: 492,
            day: 1
          },
          {
            stationCode: 'CNB',
            stationName: 'Kanpur Central',
            arrivalTime: '23:02',
            departureTime: '23:07',
            distance: 439,
            day: 1
          },
          {
            stationCode: 'JHS',
            stationName: 'Jhansi Junction',
            arrivalTime: '01:28',
            departureTime: '01:38',
            distance: 707,
            day: 2
          },
          {
            stationCode: 'BPL',
            stationName: 'Bhopal Junction',
            arrivalTime: '04:15',
            departureTime: '04:25',
            distance: 1051,
            day: 2
          },
          {
            stationCode: 'ET',
            stationName: 'Itarsi Junction',
            arrivalTime: '05:20',
            departureTime: '05:30',
            distance: 1122,
            day: 2
          },
          {
            stationCode: 'BSL',
            stationName: 'Bhusaval Junction',
            arrivalTime: '07:23',
            departureTime: '07:33',
            distance: 1338,
            day: 2
          },
          {
            stationCode: 'BCT',
            stationName: 'Mumbai Central',
            arrivalTime: '08:35',
            departureTime: 'Destination',
            distance: 1384,
            day: 2
          }
        ]
      };

      setScheduleData(mockSchedule);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Train Schedule
          </h1>
          <p className="text-xl text-gray-600">
            Check detailed train schedule and station timings
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
                Train Number or Name
              </label>
              <input
                type="text"
                value={trainNumber}
                onChange={(e) => {
                  setTrainNumber(e.target.value);
                  setError('');
                }}
                placeholder="Enter train number (e.g., 12951) or name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
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
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Get Schedule</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Schedule Results */}
        {scheduleData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">{scheduleData.trainName}</h2>
              <p className="text-blue-100">Train #{scheduleData.trainNumber}</p>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Station</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Arrival</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Departure</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Distance</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scheduleData.stations.map((station, index) => (
                    <motion.tr
                      key={station.stationCode}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${
                              index === 0 ? 'bg-green-500' : 
                              index === scheduleData.stations.length - 1 ? 'bg-red-500' : 
                              'bg-blue-500'
                            }`}></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{station.stationName}</p>
                            <p className="text-sm text-gray-600">{station.stationCode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          station.arrivalTime === 'Source' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {station.arrivalTime}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          station.departureTime === 'Destination' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {station.departureTime}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-900 font-medium">
                        {station.distance} km
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Day {station.day}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Distance</p>
                  <p className="text-lg font-bold text-gray-900">
                    {scheduleData.stations[scheduleData.stations.length - 1].distance} km
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Stations</p>
                  <p className="text-lg font-bold text-gray-900">
                    {scheduleData.stations.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Journey Duration</p>
                  <p className="text-lg font-bold text-gray-900">
                    15h 40m
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Popular Trains */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Trains</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { number: '12951', name: 'Mumbai Rajdhani Express', route: 'NDLS - BCT' },
              { number: '12301', name: 'Howrah Rajdhani Express', route: 'NDLS - HWH' },
              { number: '12423', name: 'Dibrugarh Rajdhani Express', route: 'NDLS - DBRG' },
              { number: '12137', name: 'Punjab Mail', route: 'CST - FZR' },
              { number: '12615', name: 'Grand Trunk Express', route: 'NDLS - CNB' },
              { number: '12002', name: 'Bhopal Shatabdi Express', route: 'NDLS - BPL' }
            ].map((train, index) => (
              <motion.button
                key={train.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setTrainNumber(train.number)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 text-left group"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {train.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">#{train.number}</p>
                <p className="text-sm text-gray-500 mt-2">{train.route}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
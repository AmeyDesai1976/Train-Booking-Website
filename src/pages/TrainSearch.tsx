import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Users, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Train {
  id: string;
  train_number: string;
  train_name: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  available_seats: number;
  price_sleeper: number;
  price_3ac: number;
  price_2ac: number;
  price_1ac: number;
}

export const TrainSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('SL');

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const seatClass = searchParams.get('class') || 'SL';

  useEffect(() => {
    setSelectedClass(seatClass);
    fetchTrains();
  }, [from, to, date]);

  const fetchTrains = async () => {
    setLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
      const mockTrains: Train[] = [
        {
          id: '1',
          train_number: '12951',
          train_name: 'Mumbai Rajdhani Express',
          departure_time: '16:55',
          arrival_time: '08:35',
          duration: '15h 40m',
          available_seats: 45,
          price_sleeper: 485,
          price_3ac: 1280,
          price_2ac: 1850,
          price_1ac: 3105
        },
        {
          id: '2',
          train_number: '12953',
          train_name: 'August Kranti Rajdhani',
          departure_time: '17:20',
          arrival_time: '09:10',
          duration: '15h 50m',
          available_seats: 32,
          price_sleeper: 485,
          price_3ac: 1280,
          price_2ac: 1850,
          price_1ac: 3105
        },
        {
          id: '3',
          train_number: '12137',
          train_name: 'Punjab Mail',
          departure_time: '19:15',
          arrival_time: '14:20',
          duration: '19h 05m',
          available_seats: 78,
          price_sleeper: 365,
          price_3ac: 985,
          price_2ac: 1425,
          price_1ac: 2385
        },
        {
          id: '4',
          train_number: '12615',
          train_name: 'Grand Trunk Express',
          departure_time: '07:10',
          arrival_time: '03:05',
          duration: '19h 55m',
          available_seats: 56,
          price_sleeper: 365,
          price_3ac: 985,
          price_2ac: 1425,
          price_1ac: 2385
        }
      ];
      setTrains(mockTrains);
      setLoading(false);
    }, 1500);
  };

  const getPrice = (train: Train, classType: string) => {
    switch (classType) {
      case 'SL': return train.price_sleeper;
      case '3A': return train.price_3ac;
      case '2A': return train.price_2ac;
      case '1A': return train.price_1ac;
      default: return train.price_sleeper;
    }
  };

  const getClassName = (classType: string) => {
    switch (classType) {
      case 'SL': return 'Sleeper';
      case '3A': return 'AC 3 Tier';
      case '2A': return 'AC 2 Tier';
      case '1A': return 'AC First Class';
      default: return 'Sleeper';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Searching for trains...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">{from}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-900">{to}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(date), 'dd MMM yyyy')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="SL">Sleeper (SL)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="1A">AC First Class (1A)</option>
              </select>
              <Link
                to="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Modify Search
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {trains.length} trains found
          </h2>
          <p className="text-gray-600">
            Showing results for {getClassName(selectedClass)} class
          </p>
        </motion.div>

        {/* Train List */}
        <div className="space-y-4">
          {trains.map((train, index) => (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Train Info */}
                  <div className="lg:col-span-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {train.train_name}
                    </h3>
                    <p className="text-sm text-gray-600">#{train.train_number}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.2</span>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {train.departure_time}
                        </p>
                        <p className="text-sm text-gray-600">{from}</p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center">
                          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                          <div className="mx-2 bg-blue-100 rounded-full p-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-1">
                          {train.duration}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {train.arrival_time}
                        </p>
                        <p className="text-sm text-gray-600">{to}</p>
                      </div>
                    </div>
                  </div>

                  {/* Availability & Price */}
                  <div className="lg:col-span-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">
                          {train.available_seats} seats available
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{getPrice(train, selectedClass)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getClassName(selectedClass)}
                      </p>
                    </div>
                  </div>

                  {/* Book Button */}
                  <div className="lg:col-span-2">
                    <Link
                      to={`/book/${train.id}?from=${from}&to=${to}&date=${date}&class=${selectedClass}`}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {trains.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No trains found
              </h3>
              <p className="text-gray-600 mb-4">
                Try modifying your search criteria or check for different dates.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Modify Search
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
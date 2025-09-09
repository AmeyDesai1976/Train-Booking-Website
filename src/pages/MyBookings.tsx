import React, { useState, useEffect } from 'react';
import { Calendar, Train, MapPin, Clock, Download, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface Booking {
  id: string;
  pnr: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  passengers: number;
  class: string;
  status: string;
  amount: number;
  bookingDate: string;
}

export const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: '1',
        pnr: 'PNR1234567890',
        trainNumber: '12951',
        trainName: 'Mumbai Rajdhani Express',
        from: 'New Delhi',
        to: 'Mumbai Central',
        journeyDate: '2024-01-15',
        departureTime: '16:55',
        arrivalTime: '08:35',
        passengers: 2,
        class: 'AC 3 Tier',
        status: 'Confirmed',
        amount: 2560,
        bookingDate: '2024-01-10'
      },
      {
        id: '2',
        pnr: 'PNR0987654321',
        trainNumber: '12301',
        trainName: 'Howrah Rajdhani Express',
        from: 'New Delhi',
        to: 'Howrah Junction',
        journeyDate: '2024-01-20',
        departureTime: '17:00',
        arrivalTime: '10:05',
        passengers: 1,
        class: 'AC 2 Tier',
        status: 'Confirmed',
        amount: 1850,
        bookingDate: '2024-01-12'
      },
      {
        id: '3',
        pnr: 'PNR5678901234',
        trainNumber: '12137',
        trainName: 'Punjab Mail',
        from: 'Mumbai CST',
        to: 'Firozpur',
        journeyDate: '2023-12-25',
        departureTime: '19:15',
        arrivalTime: '14:20',
        passengers: 3,
        class: 'Sleeper',
        status: 'Completed',
        amount: 1095,
        bookingDate: '2023-12-20'
      }
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'waitlisted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

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
            My Bookings
          </h1>
          <p className="text-xl text-gray-600">
            View and manage your train reservations
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Bookings', count: bookings.length },
              { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status.toLowerCase() === 'confirmed').length },
              { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status.toLowerCase() === 'completed').length },
              { key: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status.toLowerCase() === 'cancelled').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-100 rounded-lg p-2">
                        <Train className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{booking.trainName}</h3>
                        <p className="text-sm text-gray-600">#{booking.trainNumber} • PNR: {booking.pnr}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {booking.from} → {booking.to}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{booking.journeyDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {booking.departureTime} - {booking.arrivalTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="mt-4 lg:mt-0 lg:ml-8 text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{booking.amount}</p>
                    <p className="text-sm text-gray-600">{booking.passengers} passenger(s)</p>
                    <p className="text-sm text-gray-600">{booking.class}</p>
                    
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Train className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't made any bookings yet." 
                  : `No ${filter} bookings found.`}
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Your First Ticket
              </button>
            </div>
          </motion.div>
        )}

        {/* Booking Detail Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedBooking.trainName}</h2>
                      <p className="text-blue-100">PNR: {selectedBooking.pnr}</p>
                    </div>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Journey Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">From:</span>
                          <span className="font-medium">{selectedBooking.from}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className="font-medium">{selectedBooking.to}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{selectedBooking.journeyDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Departure:</span>
                          <span className="font-medium">{selectedBooking.departureTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Arrival:</span>
                          <span className="font-medium">{selectedBooking.arrivalTime}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Class:</span>
                          <span className="font-medium">{selectedBooking.class}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Passengers:</span>
                          <span className="font-medium">{selectedBooking.passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking Date:</span>
                          <span className="font-medium">{selectedBooking.bookingDate}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Amount:</span>
                          <span className="text-green-600">₹{selectedBooking.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Download Ticket
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Share Ticket
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
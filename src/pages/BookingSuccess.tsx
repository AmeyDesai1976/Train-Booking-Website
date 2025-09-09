import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Share, Calendar, MapPin, Train, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const BookingSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const pnrNumber = searchParams.get('pnr') || '';
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const bookingDetails = {
    pnr: pnrNumber,
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Express',
    from: 'New Delhi',
    to: 'Mumbai Central',
    date: '2024-01-15',
    time: '16:55',
    passengers: [
      { name: 'John Doe', age: 30, gender: 'Male', seat: 'S1-25' }
    ],
    class: 'AC 3 Tier',
    amount: 1280,
    status: 'Confirmed'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your train ticket has been successfully booked
          </p>
        </motion.div>

        {/* PNR Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl p-8 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">PNR Number</h2>
              <p className="text-4xl font-mono font-bold tracking-wider">
                {bookingDetails.pnr}
              </p>
              <p className="text-blue-100 mt-2">
                Keep this number safe for future reference
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100">Status</p>
                <p className="text-2xl font-bold text-green-300">
                  {bookingDetails.status}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ticket Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Train className="w-8 h-8" />
              <div>
                <h3 className="text-2xl font-bold">{bookingDetails.trainName}</h3>
                <p className="text-orange-100">#{bookingDetails.trainNumber}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Journey Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">From</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{bookingDetails.from}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">Journey Date</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{bookingDetails.date}</p>
                <p className="text-lg text-gray-600">{bookingDetails.time}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">To</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{bookingDetails.to}</p>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Passenger Details
              </h4>
              <div className="space-y-3">
                {bookingDetails.passengers.map((passenger, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{passenger.name}</p>
                      <p className="text-sm text-gray-600">
                        {passenger.age} years, {passenger.gender}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">Seat: {passenger.seat}</p>
                      <p className="text-sm text-gray-600">{bookingDetails.class}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount Paid</span>
                <span className="text-2xl font-bold text-green-600">₹{bookingDetails.amount}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download Ticket</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Share className="w-5 h-5" />
            <span>Share Ticket</span>
          </button>

          <Link
            to="/bookings"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>View All Bookings</span>
          </Link>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6"
        >
          <h4 className="font-semibold text-yellow-800 mb-3">Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Please carry a valid ID proof during your journey</li>
            <li>• Arrive at the station at least 30 minutes before departure</li>
            <li>• Keep your PNR number handy for any queries</li>
            <li>• You can check your PNR status anytime on our website</li>
            <li>• Cancellation charges apply as per railway rules</li>
          </ul>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
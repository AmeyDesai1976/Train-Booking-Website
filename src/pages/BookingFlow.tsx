import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft, Users, CreditCard, CheckCircle, User, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const passengerSchema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup.number().min(1).max(120).required('Age is required'),
  gender: yup.string().required('Gender is required'),
});

const bookingSchema = yup.object({
  passengers: yup.array().of(passengerSchema).min(1, 'At least one passenger is required'),
  contactEmail: yup.string().email('Invalid email').required('Email is required'),
  contactPhone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
});

type BookingForm = yup.InferType<typeof bookingSchema>;

export const BookingFlow: React.FC = () => {
  const { trainId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [passengerCount, setPassengerCount] = useState(1);
  const [train, setTrain] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const seatClass = searchParams.get('class') || 'SL';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BookingForm>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      passengers: [{ name: '', age: 0, gender: '' }],
      contactEmail: user?.email || '',
      contactPhone: ''
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTrainDetails();
  }, [trainId, user]);

  const fetchTrainDetails = async () => {
    // Mock train data
    const mockTrain = {
      id: trainId,
      train_number: '12951',
      train_name: 'Mumbai Rajdhani Express',
      departure_time: '16:55',
      arrival_time: '08:35',
      duration: '15h 40m',
      price_sleeper: 485,
      price_3ac: 1280,
      price_2ac: 1850,
      price_1ac: 3105
    };
    setTrain(mockTrain);
    setLoading(false);
  };

  const getPrice = (classType: string) => {
    if (!train) return 0;
    switch (classType) {
      case 'SL': return train.price_sleeper;
      case '3A': return train.price_3ac;
      case '2A': return train.price_2ac;
      case '1A': return train.price_1ac;
      default: return train.price_sleeper;
    }
  };

  const totalAmount = getPrice(seatClass) * passengerCount;

  const updatePassengerCount = (count: number) => {
    setPassengerCount(count);
    const passengers = Array.from({ length: count }, (_, i) => 
      watch(`passengers.${i}`) || { name: '', age: 0, gender: '' }
    );
    setValue('passengers', passengers);
  };

  const onSubmit = async (data: BookingForm) => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      // Process booking
      const pnrNumber = 'PNR' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Simulate booking process
      toast.success('Booking confirmed successfully!');
      navigate(`/booking-success?pnr=${pnrNumber}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Passenger Details', icon: <Users className="w-5 h-5" /> },
    { number: 2, title: 'Review & Confirm', icon: <CheckCircle className="w-5 h-5" /> },
    { number: 3, title: 'Payment', icon: <CreditCard className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Search</span>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Train Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-900">{train?.train_name}</h3>
              <p className="text-sm text-gray-600">#{train?.train_number}</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <p className="font-bold text-gray-900">{train?.departure_time}</p>
                <p className="text-sm text-gray-600">{from}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">{train?.duration}</p>
                <div className="w-16 border-t border-gray-300 mt-1"></div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900">{train?.arrival_time}</p>
                <p className="text-sm text-gray-600">{to}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount}</p>
              <p className="text-sm text-gray-600">{passengerCount} passenger(s)</p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {/* Step 1: Passenger Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Details</h2>
                
                {/* Passenger Count */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Passengers
                  </label>
                  <select
                    value={passengerCount}
                    onChange={(e) => updatePassengerCount(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Passenger Forms */}
                <div className="space-y-6">
                  {Array.from({ length: passengerCount }, (_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Passenger {index + 1}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            {...register(`passengers.${index}.name`)}
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter full name"
                          />
                          {errors.passengers?.[index]?.name && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.passengers[index]?.name?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Age
                          </label>
                          <input
                            {...register(`passengers.${index}.age`)}
                            type="number"
                            min="1"
                            max="120"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Age"
                          />
                          {errors.passengers?.[index]?.age && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.passengers[index]?.age?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gender
                          </label>
                          <select
                            {...register(`passengers.${index}.gender`)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.passengers?.[index]?.gender && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.passengers[index]?.gender?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Details */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        {...register('contactEmail')}
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email"
                      />
                      {errors.contactEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        {...register('contactPhone')}
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                      {errors.contactPhone && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactPhone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Continue to Review
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Review */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Booking</h2>
                
                {/* Booking Summary */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Journey Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">From:</span>
                        <span className="ml-2 font-medium">{from}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">To:</span>
                        <span className="ml-2 font-medium">{to}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-medium">{date}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Class:</span>
                        <span className="ml-2 font-medium">{seatClass}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Passengers</h3>
                    <div className="space-y-2">
                      {watch('passengers')?.map((passenger, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{passenger.name} ({passenger.age}yrs, {passenger.gender})</span>
                          <span>₹{getPrice(seatClass)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Edit
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="card" className="mr-3" defaultChecked />
                        <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="upi" className="mr-3" />
                        <span className="w-5 h-5 mr-2 bg-orange-500 rounded text-white text-xs flex items-center justify-center">₹</span>
                        <span>UPI</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="wallet" className="mr-3" />
                        <span className="w-5 h-5 mr-2 bg-blue-500 rounded text-white text-xs flex items-center justify-center">W</span>
                        <span>Wallet</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base Fare ({passengerCount} passenger{passengerCount > 1 ? 's' : ''})</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Convenience Fee</span>
                        <span>₹{Math.round(totalAmount * 0.02)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GST</span>
                        <span>₹{Math.round(totalAmount * 0.05)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Amount</span>
                        <span>₹{Math.round(totalAmount * 1.07)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Review
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors font-semibold"
                  >
                    Pay ₹{Math.round(totalAmount * 1.07)}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};
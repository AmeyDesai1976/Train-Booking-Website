import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TrainSearch } from './pages/TrainSearch';
import { BookingFlow } from './pages/BookingFlow';
import { BookingSuccess } from './pages/BookingSuccess';
import { PNRStatus } from './pages/PNRStatus';
import { TrainSchedule } from './pages/TrainSchedule';
import { Profile } from './pages/Profile';
import { MyBookings } from './pages/MyBookings';
import { ForgotPassword } from './pages/ForgotPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/search" element={<TrainSearch />} />
              <Route path="/book/:trainId" element={<BookingFlow />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/pnr-status" element={<PNRStatus />} />
              <Route path="/schedule" element={<TrainSchedule />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<MyBookings />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
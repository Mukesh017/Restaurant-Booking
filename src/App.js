import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import AvailabilityDisplay from './components/AvailabilityDisplay';
import CalendarView from './components/CalendarView';
import './index.css';
import axios from 'axios';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [booking, setBooking] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false); 

  const handleBookingSuccess = async (newBookingData) => {
    try {
      // Send booking data to your backend API
      const response = await axios.post('/api/bookings', newBookingData); 
      if (response.status === 201) { // Assuming 201 Created status code on successful creation
        setBooking(response.data); // Update booking state with the created booking data (including ID)
        setShowBookingForm(false); 
      } else {
        console.error('Error creating booking:', response.status);
        // Handle error (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handleButtonClick = () => {
    setShowBookingForm(true); 
  };

  // Fetch availability data on selectedDate change
  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDate) {
        try {
          const response = await axios.get(`http://localhost:3001/api/availability?date=${selectedDate.toISOString()}`);
          setAvailabilityData(response.data);
        } catch (error) {
          console.error('Error fetching availability:', error);
        }
      }
    };
    fetchAvailability();
  }, [selectedDate]);

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="booking-hero text-center"> 
            <h1 className="text-4xl font-bold mb-4">Welcome to the Food Station!</h1>
            <p className="text-lg mb-8">Book your table now and experience our delicious food.</p>
            <button className="btn btn-primary" onClick={handleButtonClick}>Book Your Table Now</button> 
          </div>
          <div className="mt-10"> {/* Add some space between hero section and form */}
            <Routes>
              <Route
                path="/"
                element={
                  <div className="max-w-md mx-auto">
                    {showBookingForm && (
                      <BookingForm 
                        onBookingSuccess={handleBookingSuccess} 
                        selectedDate={selectedDate} 
                        setSelectedDate={setSelectedDate} 
                        setShowBookingForm={setShowBookingForm} 
                      />
                    )}
                    <CalendarView onDateSelect={setSelectedDate} availableSlots={availabilityData} />
                    {booking && (
                      <BookingConfirmation 
                        booking={booking} 
                        // Optionally pass a function to handle booking cancellation/modifications
                      />
                    )}
                    <AvailabilityDisplay availabilityData={availabilityData} />
                  </div>
                }
              />
              {/* Add more routes if needed */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
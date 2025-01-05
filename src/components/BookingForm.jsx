import React, { useState } from 'react';
import BookingService from '../services/BookingService';
import './StylingForm.css';

const BookingForm = ({ onBookingSuccess, selectedDate }) => {
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBooking = {
        date: selectedDate,
        time,
        guests,
        name,
        phone,
        email,
      };

      const createdBooking = await BookingService.createBooking(newBooking);
      onBookingSuccess(createdBooking);
      setMessage('Booking successful!');

      // Clear form fields (optional)
      setTime('');
      setGuests(1);
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Bad Request: Please check your input data.');
      } else if (error.response && error.response.status === 500) {
        setMessage('Internal Server Error. Please try again later.');
      } else {
        setMessage('Error creating booking. Please try again.');
      }
      console.error('Error creating booking:', error.response?.data?.message || error.response?.statusText || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="guests">Guests:</label>
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Book Now
      </button>
      <p className="message">{message}</p>
    </form>
  );
};

export default BookingForm;
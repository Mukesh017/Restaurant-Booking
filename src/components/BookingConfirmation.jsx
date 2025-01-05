import React from 'react';

const BookingSummary = ({ booking, onBookingConfirmed }) => {
  if (!booking) {
    return null;
  }

  const handleBookingConfirmation = async () => {
    // Send booking data to backend using fetch or Axios (example with fetch)
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });

    if (response.ok) {
      onBookingConfirmed(); // Call the callback prop to trigger console logging or other actions
    } else {
      console.error('Error creating booking:', await response.text());
    }
  };

  return (
    <div>
      <p>Your booking details:</p>
      <ul>
        <li>Date: {new Date(booking.date).toLocaleDateString()}</li>
        <li>Time: {booking.time}</li>
        <li>Guests: {booking.guests}</li>
        <li>Name: {booking.name}</li>
        <li>Phone: {booking.phone}</li>
        <li>Email: {booking.email}</li>
      </ul>
      <button onClick={handleBookingConfirmation}>Booking Confirmed!</button>
    </div>
  );
};

export default BookingSummary;
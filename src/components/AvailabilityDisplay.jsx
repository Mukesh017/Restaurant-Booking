import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailabilityDisplay = ({ selectedDate }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/bookings/${selectedDate}`); 
        const bookedTimes = response.data.map((booking) => booking.time); 
        const allTimes = [
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
          '19:00',
          '19:30',
          '20:00',
          '20:30',
          '21:00',
          '21:30',
        ];
        const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));
        setAvailableTimes(availableTimes);
      } catch (error) {
        console.error('Error fetching available times:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedDate) {
      fetchAvailableTimes();
    }
  }, [selectedDate]);

  return (
    <div>
      {isLoading ? (
        <p>Loading available times...</p>
      ) : error ? (
        <p>Error fetching available times: {error.message}</p>
      ) : (
        <div>
          {availableTimes.length === 0 ? (
            <p></p> 
          ) : (
            <div>
              <h3>No available times for the selected date.</h3>
              <ul>
                {availableTimes.map((time) => (
                  <li key={time}>{time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityDisplay;
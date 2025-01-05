import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/bookings'; 

const BookingService = {
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(BASE_URL, bookingData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating booking: ' + error.message);
    }
  },

  getAvailability: async (date) => {
    try {
      const response = await axios.get(`${BASE_URL}/availability?date=${date}`); 
      return response.data;
    } catch (error) {
      throw new Error('Error fetching availability: ' + error.message);
    }
  },

  getBookings: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error; 
    }
  },

  deleteBooking: async (bookingId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error; 
    }
  }
};

export default BookingService;
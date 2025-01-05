import express from 'express'; 
import mongoose from 'mongoose'; 
import bodyParser from 'body-parser'; 
import cors from 'cors';
import Booking from './models/Booking.js'; 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mukeshkeshri114:P8idonRQDHRaSN9D@cluster17.fsxiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster17', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000 
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err)); 

// Create a booking
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();

        console.log('Booking saved:', savedBooking);

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Get bookings for a specific date (for availability check)
app.get('/api/availability', async (req, res) => {
    try {
      const { date } = req.query;
      const parsedDate = new Date(date.replace(/\\/g, '/'));
      console.log('Received date:', date);

      if (!date) {
        return res.status(400).json({ message: 'Date is required' });
      }

      const bookings = await Booking.find({ date: parsedDate });
      console.log('Bookings found:', bookings);

      const availableTimes = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
                             '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', 
                             '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', 
                             '21:00', '21:30']; 
      const bookedTimes = bookings.map(booking => booking.time); 
      const availableSlots = availableTimes.filter(time => !bookedTimes.includes(time)); 
      res.json(availableSlots); 
    } catch (err) {
      console.error('Error fetching availability:', err);
      res.status(500).json({ message: 'Error fetching availability', error: err });
    }
});

const port = 3001; 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
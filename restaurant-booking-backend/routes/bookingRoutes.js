const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurant_bookings', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Create a booking
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(500).json({ message: 'Error creating booking', error: err });
    }
});

// Get bookings for a specific date
app.get('/api/bookings/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const bookings = await Booking.find({ date: date });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err });
    }
});

// Get a single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching booking', error: err });
    }
});

// Update a booking
app.put('/api/bookings/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: 'Error updating booking', error: err });
    }
});

// Delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const result = await Booking.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ message: 'Error deleting booking', error: err });
    }
});

const port = 3001; 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
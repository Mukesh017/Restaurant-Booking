import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

export default model('Booking', bookingSchema);
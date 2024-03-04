const mongoose = require('mongoose');

// Define seatSchema
const seatSchema = new mongoose.Schema({
  show_time: { type: String, required: true },
  seats: { type: [Number], required: true }
});

// Define movieSchema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }
});

// Define showSchema
const showSchema = new mongoose.Schema({
  time: { type: String, required: true },
  movie: { type: movieSchema, required: true },
  seats: {
    total: { type: Number, required: true },
    available: { type: Number, required: true }
  }
});

// Define bookingSchema
const bookingSchema = new mongoose.Schema({
  day: { type: Date, required: true },
  talkie: {
    name: { type: String, required: true },
    location: { type: String, required: true }
  },
  shows: { type: [showSchema], required: true },
  booked_seats: { type: [seatSchema], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Create and export the mongoose model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

const mongoose = require('mongoose');

// Define offerSchema
const offerSchema = new mongoose.Schema({
  description: { type: String, required: true },
  discount_percentage: { type: Number, required: true },
  categories: { type: [String], required: true },
  location: { type: String, required: true},
  validity_period: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Create and export the mongoose model
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

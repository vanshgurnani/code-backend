const mongoose = require('mongoose');

// Define productSchema
const productSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  product_category: { type: String, required: true },
  location: { type: String }, 
  free_samples: { type: Boolean, default: false },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Create and export the mongoose model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

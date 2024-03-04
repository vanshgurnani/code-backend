// offerController.js
const Offer = require('../models/offerModel');

// Controller function to handle offer creation
exports.createOffer = async (req, res) => {
  try {
    const created_by = req.user.userId;
    console.log(created_by);

    const { description, discount_percentage, categories, location, validity_period } = req.body;
    const offer = new Offer({ description, discount_percentage, categories, location, validity_period, created_by });
    const savedOffer = await offer.save();
    res.json({ message: 'Offer created successfully', offer: savedOffer });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to handle offer retrieval for a specific user ID
exports.getOffersForUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);

    const offers = await Offer.find({ created_by: userId });
    console.log('Offers:', offers);
    res.json({ message: 'Offers retrieved successfully', offers });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOffers = async (req, res) => {
    try {
      const offers = await Offer.find({});
      res.json({ message: 'Offers retrieved successfully', offers });
    } catch (error) {
      console.error('Error in getOffers controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offerId = req.params.productId; // Assuming the product ID is passed as a route parameter
    const deletedOffer = await Offer.findByIdAndDelete(offerId);

    if (!deletedOffer) {
      return res.status(404).json({ error: 'No offer found for the specified user.' });
    }

    res.json({ message: 'Offer deleted successfully', offer: deletedOffer });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateOffer = async (req, res) => {
  try {
    const offerId = req.params.productId;

    // Extract the fields you want to update from the request body
    const { description, discount_percentage, categories, location, validity_period } = req.body;

    // Find the user's offer and update its fields
    const updatedOffer = await Offer.findOneAndUpdate(
      { offerId },
      { description, discount_percentage, categories, location, validity_period },
      { new: true, runValidators: true }
    );

    if (!updatedOffer) {
      return res.status(404).json({ error: 'No offer found for the specified user.' });
    }

    res.json({ message: 'Offer updated successfully', offer: updatedOffer });
  } catch (error) {
    console.error('Error in updateOfferForUser controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getFilteredOffers = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Extract filter parameters from the request query
    const { categories, location } = req.query;

    // Build a filter object based on the provided parameters
    const filter = { created_by: userId };
    if (categories) {
      // If categories are provided, filter by categories
      filter.categories = { $in: categories.split(',') };
    }
    if (location) {
      // If location is provided, filter by location
      filter.location = location;
    }

    // Fetch offers based on the constructed filter
    const offers = await Offer.find(filter);

    res.json({ message: 'Filtered offers retrieved successfully', offers });
  } catch (error) {
    console.error('Error in getFilteredOffersForUser controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  

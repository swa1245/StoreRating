// controllers/storeController.js
const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.find().select('name address rating');
    res.status(200).json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};

exports.submitRating = async (req, res) => {
    const { storeId, rating } = req.body;
    const userId = req.user._id; // User ID should be set by auth middleware
  
    if (!storeId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid data' });
    }
  
    try {
      let existingRating = await Rating.findOne({ store: storeId, user: userId });
  
      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
      } else {
        const newRating = new Rating({ store: storeId, user: userId, rating });
        await newRating.save();
      }
  
      // Update average rating for the store
      const ratings = await Rating.find({ store: storeId });
      const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      await Store.findByIdAndUpdate(storeId, { rating: avgRating });
  
      res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error submitting rating:', error);
      res.status(500).json({ message: 'Failed to submit rating' });
    }

};

const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.listStores = async (req, res) => {
  const stores = await Store.find().select('name address rating');
  res.send(stores);
};

// controllers/storeController.js
exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;

  // Basic validation
  if (!storeId || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    // Save the rating
    const ratingEntry = new Rating({ store: storeId, user: req.user._id, rating });
    await ratingEntry.save();

    // Calculate average rating
    const ratings = await Rating.find({ store: storeId });
    const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    // Update store rating
    await Store.findByIdAndUpdate(storeId, { rating: avgRating });

    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Failed to submit rating' });
  }
};

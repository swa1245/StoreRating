// ratingController.js
const Rating = require('../models/Rating');
const Store = require('../models/Store');

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id; // Get user ID from JWT

  try {
    // Check if rating already exists
    let existingRating = await Rating.findOne({ store: storeId, user: userId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      await existingRating.save();
      res.json({ message: 'Rating updated successfully', rating: existingRating });
    } else {
      // Create new rating
      const newRating = new Rating({ store: storeId, user: userId, rating });
      await newRating.save();
      res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
    }

    // Update store's average rating
    const ratings = await Rating.find({ store: storeId });
    const avgRating = ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length;
    await Store.findByIdAndUpdate(storeId, { rating: avgRating });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.listStores = async (req, res) => {
  const stores = await Store.find().select('name address rating');
  res.send(stores);
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const ratingEntry = new Rating({ store: storeId, user: req.user._id, rating });
  await ratingEntry.save();

  // Update average rating for the store
  const ratings = await Rating.find({ store: storeId });
  const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

  await Store.findByIdAndUpdate(storeId, { rating: avgRating });
  res.send('Rating submitted');
};
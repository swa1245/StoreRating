const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.createStore = async (req, res) => {
  const { name, email, address } = req.body;
  const store = new Store({ name, email, address });
  await store.save();
  res.status(201).send('Store created');
};

exports.dashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStores = await Store.countDocuments();
  const totalRatings = await Rating.countDocuments();
  
  res.send({ totalUsers, totalStores, totalRatings });
};
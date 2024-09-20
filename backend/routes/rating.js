const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/submit-rating', authMiddleware, submitRating);

module.exports = router;

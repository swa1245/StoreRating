const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Ensure you have this middleware
const storeController = require('../controllers/storeController');

// Apply authentication middleware to this route
router.get('/user/stores', authMiddleware, storeController.listStores);
router.post('/submit-rating', authMiddleware, storeController.submitRating);

// Add other routes as needed

module.exports = router;

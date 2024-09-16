const express = require('express');
const { listStores, submitRating } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/stores', authMiddleware, listStores);
router.post('/submit-rating', authMiddleware, submitRating);

module.exports = router;

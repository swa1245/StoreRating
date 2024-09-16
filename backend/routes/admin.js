const express = require('express');
const { createStore, dashboard } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/create-store', authMiddleware, createStore);
router.get('/dashboard', authMiddleware, dashboard);

module.exports = router;

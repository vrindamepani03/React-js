// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example protected route
router.get('/admin', protect, admin, (req, res) => {
  res.send('Admin content');
});

module.exports = router;

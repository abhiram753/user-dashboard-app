const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { validateUser, validateUserId } = require('../middleware/validation');

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', validateUserId, getUserById);

// @route   POST /api/users
// @desc    Create new user
// @access  Public
router.post('/', validateUser, createUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Public
router.put('/:id', validateUserId, validateUser, updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Public
router.delete('/:id', validateUserId, deleteUser);

module.exports = router;

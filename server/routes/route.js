const express = require('express');
const { appointmentController } = require('../controllers/appointmentController');
const { getAvailableSlotsController } = require('../controllers/getAvailableSlotsController');
const router = express.Router();

// Route to fetch available slots
router.get('/slots', getAvailableSlotsController);

// Route to book an appointment
router.post('/book', appointmentController);

module.exports = router;
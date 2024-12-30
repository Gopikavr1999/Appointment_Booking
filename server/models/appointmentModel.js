const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: Date,
    timeSlot: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

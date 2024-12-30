// Import the Appointment model
const { getDatabaseInstance } = require('../dbConnection');
const Appointment = require('../models/appointmentModel');

const appointmentController = async (req,res) => {
    const { name, phone, date, timeSlot } = req.body;
    console.log(name, phone, date, timeSlot);
     // Get the correct database instance
     const db = getDatabaseInstance();

    if (!name || !phone || !date || !timeSlot)
        return res.status(400).send('All fields are required');

    try {
         // Use the correct database instance to interact with the Appointment model
         const AppointmentModel = db.model('Appointment', Appointment.schema);
        const isBooked = await AppointmentModel.findOne({ date, timeSlot });
        if (isBooked) return res.status(400).send('Slot already booked');

        const appointment = new AppointmentModel({ name, phone, date, timeSlot });
        await appointment.save();

        console.log("Booking Successful");

        res.status(201).send('Appointment booked successfully');
    } catch (err) {
        res.status(500).send('Error booking appointment');
    }
}

module.exports = {appointmentController}
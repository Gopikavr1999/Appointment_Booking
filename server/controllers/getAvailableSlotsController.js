// Import the Appointment model
const Appointment = require('../models/appointmentModel');

// Helper function to generate available slots
const generateSlots = () => {
    const slots = [];
    const start = 10; // 10:00 AM
    const end = 17; // 5:00 PM

    for (let hour = start; hour < end; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : '30'}`;
            if (time !== "13:00" && time !== "13:30") slots.push(time); // Exclude break
        }
    }

    return slots;
};
// Fetch available slots
const getAvailableSlotsController = async (req, res) => {
    const { date } = req.query;
    console.log("date",date);
    
    if (!date) return res.status(400).send('Date is required');

    try {
        const bookedSlots = await Appointment.find({ date }).select('timeSlot -_id');
        const allSlots = generateSlots();

        const availableSlots = allSlots.filter(slot => !bookedSlots.some(b => b.timeSlot === slot));
        res.send(availableSlots);
    } catch (err) {
        res.status(500).send('Error fetching slots');
    }
};

module.exports = {getAvailableSlotsController}
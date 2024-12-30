const mongoose = require('mongoose');

const getDatabaseInstance = (options = { cache: false }) => {
    const dbName = 'Appointment_Booking'; // Hardcoded database name
    return mongoose.connection.useDb(dbName, options);
};

module.exports = { getDatabaseInstance };

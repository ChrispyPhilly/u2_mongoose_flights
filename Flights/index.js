const mongoose = require('./db/index');
const Airport = require('./models/airport');
const Flight = require('./models/flight');

const readData = async () => {
    try {
        const allAirports = await Airport.find();
        const allFlights = await Flight.find().populate('departingAirport arrivalAirport');
        
        console.log('Airports:', allAirports);
        console.log('Flights:', allFlights);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

readData();
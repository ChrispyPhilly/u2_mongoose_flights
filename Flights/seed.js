const mongoose = require('./db/index');
const Airport = require('./models/airport');
const Flight = require('./models/flight');

const airports = [
    { name: 'Philadelphia Airport', location: 'Philadelphia, Pa', code: 'PHL' },
    { name: 'John F. Kennedy International Airport', location: 'New York, NY', code: 'JFK' },
    { name: 'Nashville International Airport', location: 'Nashville, TN', code: 'BNA' },
    { name: 'San Francisco International Airport', location: 'San Francisco, CA', code: 'SFO' }
];

const flights = [
    { airline: 'Delta', flightNumber: 123, price: 200, numberOfSeats: 150, departingAirport: null, arrivalAirport: null, departureDateTime: new Date('2023-10-01T10:00:00') },
    { airline: 'American Airlines', flightNumber: 456, price: 300, numberOfSeats: 180, departingAirport: null, arrivalAirport: null, departureDateTime: new Date('2023-10-02T11:00:00') },

];

const seedDatabase = async () => {
    try {
        await Airport.deleteMany({});
        const savedAirports = await Airport.insertMany(airports);
        
        
        flights.forEach(flight => {
            flight.departingAirport = savedAirports[0]._id; 
            flight.arrivalAirport = savedAirports[1]._id;   
        });

        await Flight.deleteMany({});
        await Flight.insertMany(flights);
        console.log('Database seeded!');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
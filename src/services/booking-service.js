const { BookingRepository } = require('../repository/index');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors/index');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Not enough seats available');
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightURL, {
                totalSeats: flightData.totalSeats - booking.noOfSeats
            });

            const finalBooking=await this.bookingRepository.update(booking.id,{status:"Confirmed"});
            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ServiceError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;

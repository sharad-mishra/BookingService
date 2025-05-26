const dotenv= require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH , 
}
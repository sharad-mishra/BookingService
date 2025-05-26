const { BookingService } = require('../services/index');
const bookingService = new BookingService();
const { StatusCodes } = require('http-status-codes');


const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        console.log("From Booking Controller",response);
        return res.status(StatusCodes.OK).json({
            message : 'Successfully created booking',
            success : true,
            err : {},
            data : response
        })
    } catch (error) {
        console.log("From Booking Controller",error);
        return res.status(error.statusCode).json({
            message : error.message,
            success : false,
            err : error.explanation,
            data : {}
        });
    }
}


module.exports= {
    create
}
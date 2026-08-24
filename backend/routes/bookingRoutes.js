const express = require('express');
const ClassBooking = require('../models/ClassBooking');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.use(authGuard);

router.post('/', async (req, res, next) => {
  try {
    const { trainerId, className, date, timeSlot } = req.body;
    const memberId = req.member.memberId;

    const booking = new ClassBooking({
      memberId,
      trainerId,
      className,
      date,
      timeSlot,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

router.get('/my', async (req, res, next) => {
  try {
    const memberId = req.member.memberId;
    const bookings = await ClassBooking.find({ memberId })
      .populate('memberId', 'name email')
      .populate('trainerId', 'name specialization');
      
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['booked', 'attended', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
       // Manual validation error to trigger mongoose-like or custom response, or rely on mongoose
       // The prompt says "Use Mongoose validation", so we can use findByIdAndUpdate with runValidators
    }

    const booking = await ClassBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

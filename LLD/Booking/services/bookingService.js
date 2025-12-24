const { randomUUID } = require('crypto');
const bookingRepo = require('../repositories/bookingRepository');
const { AppError } = require('../utils/errors');
const { required } = require('../utils/validators');

const VALID_TRANSITIONS = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

class BookingService {
  create(userId, seatId) {
    required(userId, 'userId');
    required(seatId, 'seatId');

    if (!bookingRepo.reserveSeat(seatId, 'TEMP')) {
      throw new AppError('Seat already reserved');
    }

    const booking = {
      id: randomUUID(),
      userId,
      seatId,
      status: 'PENDING',
      createdAt: Date.now(),
    };

    bookingRepo.saveBooking(booking);
    bookingRepo.seats.set(seatId, booking.id);

    return booking;
  }

  get(id) {
    const booking = bookingRepo.getBooking(id);
    if (!booking) throw new AppError('Booking not found', 404);
    return booking;
  }

  transition(id, nextStatus) {
    const booking = this.get(id);
    const allowed = VALID_TRANSITIONS[booking.status];

    if (!allowed.includes(nextStatus)) {
      throw new AppError(
        `Invalid transition from ${booking.status} to ${nextStatus}`
      );
    }

    // Release seat on cancel
    if (nextStatus === 'CANCELLED') {
      bookingRepo.releaseSeat(booking.seatId);
    }

    booking.status = nextStatus;
    return bookingRepo.saveBooking(booking);
  }

  confirm(id) {
    return this.transition(id, 'CONFIRMED');
  }

  complete(id) {
    return this.transition(id, 'COMPLETED');
  }

  cancel(id) {
    return this.transition(id, 'CANCELLED');
  }
}

module.exports = new BookingService();

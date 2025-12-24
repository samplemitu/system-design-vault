class BookingRepository {
  constructor() {
    this.bookings = new Map(); // bookingId → booking
    this.seats = new Map(); // seatId → bookingId
  }

  saveBooking(booking) {
    this.bookings.set(booking.id, booking);
    return booking;
  }

  getBooking(id) {
    return this.bookings.get(id) || null;
  }

  reserveSeat(seatId, bookingId) {
    if (this.seats.has(seatId)) return false;
    this.seats.set(seatId, bookingId);
    return true;
  }

  releaseSeat(seatId) {
    this.seats.delete(seatId);
  }

  isSeatReserved(seatId) {
    return this.seats.has(seatId);
  }
}

module.exports = new BookingRepository();


const router = require('express').Router();
const bookingService = require('../services/bookingService');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/bookings', rateLimiter, (req, res) => {
  res.status(201).json({
    data: bookingService.create(req.body.userId, req.body.seatId),
  });
});

router.get('/bookings/:id', rateLimiter, (req, res) => {
  res.json({
    data: bookingService.get(req.params.id),
  });
});

router.post('/bookings/:id/confirm', rateLimiter, (req, res) => {
  res.json({
    data: bookingService.confirm(req.params.id),
  });
});

router.post('/bookings/:id/complete', rateLimiter, (req, res) => {
  res.json({
    data: bookingService.complete(req.params.id),
  });
});

router.post('/bookings/:id/cancel', rateLimiter, (req, res) => {
  res.json({
    data: bookingService.cancel(req.params.id),
  });
});

module.exports = router;


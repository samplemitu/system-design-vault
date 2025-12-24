const { AppError } = require('../utils/errors');

const buckets = new Map();
const CAPACITY = 10;
const REFILL_RATE = 1;

function rateLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();

  let bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { tokens: CAPACITY - 1, last: now });
    return next();
  }

  const elapsed = (now - bucket.last) / 1000;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + elapsed * REFILL_RATE);
  bucket.last = now;

  if (bucket.tokens < 1) {
    throw new AppError('Too many requests', 429);
  }

  bucket.tokens -= 1;
  next();
}

module.exports = rateLimiter;


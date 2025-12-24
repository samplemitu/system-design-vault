const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./routes/bookingRoutes'));

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Booking service running on port 3000');
});

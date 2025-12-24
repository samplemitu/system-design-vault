const { AppError } = require('./errors');

function required(value, name) {
  if (value === undefined || value === null) {
    throw new AppError(`${name} is required`);
  }
}

module.exports = { required };


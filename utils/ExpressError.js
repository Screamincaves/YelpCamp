class ExpressError extends Error {
  //Custom error class that extends the built in error class
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;

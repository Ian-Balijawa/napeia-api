// Needed to wrap async routes in express to handle errors properly
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
const asyncMiddleware = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next());
};

module.exports = asyncMiddleware;

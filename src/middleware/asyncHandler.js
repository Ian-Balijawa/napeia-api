module.exports = function (handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (ex) {
			next(ex);
		}
	};
};

// Needed to wrap async routes in express to handle errors properly
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// const asyncMiddleware = (fn) => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

// module.exports = asyncMiddleware;

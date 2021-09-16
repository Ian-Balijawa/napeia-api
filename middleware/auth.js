const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	if (!config.get('requiresAuth')) return next();

	const token = req.header('X-auth-token');
	if (!token)
		return res.status(401).send('Access denied. No token Provided!');

	try {
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send('Ivalid Token Provided');
	}
};

const User = require('../models/User');
const { errorHandler } = require('../utilities/errorHandler');

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const user = await User.findByToken(token);

    if (!user) next(errorHandler('User not found'));

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

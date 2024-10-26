
module.exports = (req, res, next) => {

  try {
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
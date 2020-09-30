module.exports = function (req, res, next) {
  // Forbidden
  if(!req.user.isEmploy) return res.status(403).send('Acceso Denegado.');

  next();
}
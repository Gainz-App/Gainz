const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('secretCookie', Math.floor(Math.random() * 100));
  return next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.authUser) {
    res.cookie('SSID', res.locals.authUser.id, { httpOnly: true });
  }
  return next();
};

module.exports = cookieController;

'use strict'


module.exports = (req, res, next) => {
  
    if (!req.session.cart) {
    req.session.cart = [];
  }

  next();
};

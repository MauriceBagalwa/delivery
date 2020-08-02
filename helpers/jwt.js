const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccesToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1m",
        issuer: "pickurpage.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const autHeader = req.headers["authorization"];
    const bearerToken = autHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  signrefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "5m",
        issuer: "pickurpage.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          // const message =
          //   err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
          // return next(createError.Unauthorized(message));

          const uerId = payload.aud;
          resolve(uerId);
        }
      );
    });
  },
};

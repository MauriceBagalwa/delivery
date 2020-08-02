const user = require("../models/User");
const creatError = require("http-errors");
const { sendmail } = require("../helpers/email");
const {
  signAccesToken,
  signrefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");
const { authSchema } = require("../middleware/validationSchema");
module.exports = {
  signup: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const doesExist = await user.findOne({ mail: result.mail });
      if (doesExist) {
        throw creatError.Conflict(`${result.mail} already exist been regisred`);
      } else {
        const saved = await new user(result).save();
        res.send({ saved });
      }
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const verify = await user.findOne({ mail: result.mail });
      if (!verify) throw creatError.NotFound("username or password not valid");
      const isMatch = await verify.isvalidPassword(result.password);
      if (!isMatch)
        throw creatError.Unauthorized("username or password not valid");
      const accesToken = await signAccesToken(verify.id);
      const refreshToken = await signrefreshToken(verify.id);
      res.send({ accesToken, refreshToken });
    } catch (error) {
      if (error.isJoi == true)
        return next(creatError.BadRequest("Invalid username or password"));
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw creatError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccesToken(userId);
      const refToken = await signrefreshToken(userId);

      res.send({ accessToken, refToken });
    } catch (error) {
      next(error);
    }
  },
  logOut: (req, res, next) => {
    res.send("I'm logOut");
  },
  email: async (req, res, next) => {
    try {
      if (await sendmail(req)) {
        const message = `mail sent`;
        res.send({ message });
      } else {
        throw creatError.InternalServerError();
      }
    } catch (error) {
      next(error);
    }
  },
};

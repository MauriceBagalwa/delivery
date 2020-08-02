const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  name: Joi.string().max(20),
  lastname: Joi.string().max(20),
  mail: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  authSchema,
  // : (req, res, next) => {
  //   const value = authSchema.validate(req.body);
  //   if (value.error) {
  //     res.json({
  //       message: value.error.details[0].message,
  //     });
  //   } else {
  //     next();
  //   }
  // },
};

const typesR = require("../models");
const createError = require("http-errors");
const shortId = require("shortid");
module.exports = {
  types: (req, res, next) => {
    const { type } = req.body;
    console.log(type);
    typesR.typerequest
      .findOne({ where: { type: type } })
      .then((find) => {
        if (find) {
          res.status(400).json({ error: `Type "${type}" is already exist` });
        } else {
          const value = {
            id: shortId.generate(),
            type: type,
          };
          typesR.typerequest
            .create(value)
            .then((iscreate) => {
              res.send({ iscreate });
            })
            .catch((error) => {
              throw createError.InternalServerError();
            });
        }
      })
      .catch((error) => {
        next(error);
      });
  },
};

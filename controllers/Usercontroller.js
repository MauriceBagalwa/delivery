const User = require("../models/User");

module.exports = {
  signup: (req, res, next) => {
    /*
      ?#1 recuperation de données du Body...
    */
    const { name, lastname, mail, password, level } = req.body;
    // const { name, lastname, password, mail, level } = req.body;
    /*
      ?#2
      ? Verification de l'existance
      ?de l'utilisateur
    */

    User.findOne({ mail: mail })
      .then((isExist) => {
        if (isExist) res.json({ message: mail + " is already exist..." });
        else {
            
          const values = new User({
            name: name,
            lastname: lastname,
            password: password,
            mail: mail,
            level: level,
          });
          values
            .save()
            .then((isadd) => {
              res.send(isadd);
            })
            .catch((error) => {
              next(error);
            });
        }
      })
      .catch((error) => {
        next(error);
      });
  },
  singin: (res, req) => {},
};

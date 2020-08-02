const router = require("express").Router();
const controller = require("../controllers");



router.post("",controller.userCtrl.signup);




// const User = require("../models/User");

// router.get("/", (req, res) => {
//   User.find()
//     .then((data) => {
//       res.json({ data });
//     })
//     .catch((error) => {
//       res.json({ message: error });
//     });
// });






// router.post("/", (req, res) => {
//   const { name, lastname, password, mail, level } = req.body;
//   const user = new User({
//     name: name,
//     lastname: lastname,
//     password: password,
//     mail: mail,
//     level: level,
//   });

//   user
//     .findOne({ mail: mail })
//     .then((find) => {
//       if (find) res.json({ message: "Cette adresse mail déjà utiliser" });
//       else
//         user
//           .save()
//           .then((data) => {
//             res.json(data);
//           })
//           .catch((err) => {
//             res.json({ message: err });
//           });
//     })
//     .catch((error) => {
//       console.log("someThing went wrong... " + error);
//       res.json({ message: err });
//     });
// });

module.exports = router;

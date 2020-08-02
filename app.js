/*
? impotation des packages important
*/
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const CreatError = require("http-errors");
require("dotenv").config();
require("./utils/db");
/*
? Mes variables
*/
const app = express();
const port = process.env.PORT;

app.get("/", async (res, req, next) => {
  req.send("Hello new wolrd");
});

/*
? Request
*/

app.use(bodyParser.json());
app.use("/user", router._user);
app.use("/auth", router._auth);

/*
? Gestionnaire des Erreurs
*/
app.use(async (req, res, next) => {
  next(CreatError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

/*
? Request
*/
// db.sequelize.sync().then(() => {
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // });
});

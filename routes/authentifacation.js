const authController = require("../controllers/auth");
const router = require("express").Router();
const { verifyAccessToken } = require("../helpers/jwt");
router.get("/sigin", authController.signIn);
router.post("/sigup", authController.signup);
router.post("/refresh-token", authController.refreshToken);
router.delete("/logout", verifyAccessToken, authController.logOut);
router.post("/email", authController.email);

module.exports = router;

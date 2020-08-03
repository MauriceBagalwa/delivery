const typeContoller = require("../controllers/type");
const router = require("express").Router();

router.post("/type", typeContoller.types);
module.exports = router;

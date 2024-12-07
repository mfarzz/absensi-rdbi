var express = require('express');
var router = express.Router();
const { register, login } = require("../controllers/login");

router.get("/", (req, res) => {
  res.send("Welcome to the authentication API");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;

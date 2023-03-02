const { Router } = require("express");
const { create } = require("../middlewares/user");

const router = Router();

router.put('/signup', create);


module.exports = router;



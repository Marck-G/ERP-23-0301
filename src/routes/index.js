const { Router } = require("express");
const task = require('./task');
const router =  Router();

router.use('/task', task);

module.exports = router;

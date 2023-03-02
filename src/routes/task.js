const { Router } = require("express");
const { listFilter, list, update, del } = require("../middlewares/task");

const router =  Router();

router.post('/list/filter', listFilter);
router.post('/list', list);
router.post('/:uid', update);
router.delete('/:uid', del);

module.exports = router;
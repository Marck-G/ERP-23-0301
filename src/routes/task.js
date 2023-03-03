const { Router } = require("express");
const { listFilter, list, update, del, create } = require("../middlewares/task");

const router =  Router();

router.post('/list/filter', listFilter);
router.post('/list', list);
router.post('/:uid', update);
router.delete('/:uid', del);
router.put('/', create);

module.exports = router;
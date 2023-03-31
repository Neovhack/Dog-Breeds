const { Router } = require('express');
const { Temperament } = require('../db.js')

const router = Router();

router.use(require("../middlewares/temperaments"))


module.exports = router;

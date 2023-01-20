const { Router } = require('express');
const { Dog, Op } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const apiKey = "live_EOAS4wjPJal19Jyepjt36Kn6O3JPb33NdhLegSC4mXiO4jkSGBdUix1aTcuxAbl5"

const router = Router();


//breed searcher
router.use(require("../middlewares/breedSearcher"))

//id search
router.use(require("../middlewares/id") )

//Post create Dog
router.use(require("../middlewares/createDog") )



module.exports = router;

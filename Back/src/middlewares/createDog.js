const { Router } = require('express');
const { Dog, Op } = require('../db.js')

const router = Router();


router.post("/", async (req, res) => {
    try {
    const { name, weight, height, life_span, temperament} = req.body
    if( !name || !weight || !height || !life_span) return res.status(404).send("Faltan datos obligatorios por llenar")
    const newDog = await Dog.findOrCreate({
        where: {name : name, weight :weight, height: height, life_span: life_span, temperament:temperament},
      
    })
    if(newDog[1]) {
        res.send("Perro Creado Exitosamente")
    } else {
        res.send("Ya existe el nombre ingresado")
    }
   
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;
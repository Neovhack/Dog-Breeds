const { Router } = require('express');
//const { Dog, Op } = require('../db.js')

const url = "https://api.thedogapi.com/v1/breeds"
const router = Router();

/* async function fetcher () {
    let fetcher = await fetch("https://api.thedogapi.com/v1/breeds")
    let data = await fetcher.json()
    return data
} */

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        let fetcher = await fetch("https://api.thedogapi.com/v1/breeds")
        let data = await fetcher.json()
        let dogId = data.find(e => e.id == id) 
        // if(dogId !== undefined){
            let apiResume =  {
                    id: dogId.id,
                    name: dogId.name,
                    temperament: dogId.temperament,
                    image: dogId.image.url,
                    weight: dogId.weight.metric,
                    height: dogId.height.metric
                }
            res.json(apiResume)
      /*   }  else { 
            const bsdogId = await Dog.findByPk(id) 
                res.json(bsdogId)
        }  */
    } catch (error) {
        res.send(error);
    }
}) 


module.exports = router;

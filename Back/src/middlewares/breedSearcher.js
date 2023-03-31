const { Router } = require('express');
const { Dog, Op } = require('../db.js')

const url = "https://api.thedogapi.com/v1/breeds"
const router = Router();

async function fetcher () {
    let fetcher = await fetch(url)
    let data = await fetcher.json()
    return data
}


router.get("/", async (req , res) => {
    let result = await fetcher()
    try {
        //Devolver todas las razas
           if(!req.query.name && !req.query.array) {   
            const bdbreeds = await Dog.findAll()
            let dogsFilters = result.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    temperament: e.temperament,
                    image: e.image.url,
                    weight: e.weight.metric,
                    height: e.height.metric
                }
            }) 
            let results = [...dogsFilters,  ...bdbreeds]
            res.status(200).json(results)   
/*               if(1 === 1) {
                throw new Error   */
    } else {
        //Devolver razas por filtro
        if(!req.query.array){
            let dataQuery = await result.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase()))
            if ( await dataQuery.length === 0) {
                const bdResults = await Dog.findAll({
                    where : {name : req.query.name}
                })
                if(bdResults.length === 0) {
                    res.send("No hay ninguna raza con la palabra ingresada")
                } else {
                    res.send(bdResults)
                }         
            } else {
                let dogsFilters = dataQuery.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        temperament: e.temperament,
                        image: e.image.url,
                        weight: e.weight.metric,
                        height: e.height.metric
                    }
                }) 
                res.json(dogsFilters)
            }
        } else {
        //Filtro para un temperamento
        const temps = req.query.array.split(",")
        let temperamentsNulls = await result.filter(e => !(e.temperament === undefined))
        if(temps.length == 1) {
            let filterOneTemps = temperamentsNulls.filter(e => e.temperament.includes(temps[0]))
             const bdbreeds = await Dog.findAll({
                    where: {
                        temperament : {
                            [Op.substring]: temps
                        }
                    }
                }) 
            
            if(filterOneTemps.length === 0 && bdbreeds.length === 0) {
                res.send("No hay resultados")
            } else {
                let dogsFilters = []
                if(filterOneTemps.length !== 0 ){
                    dogsFilters = filterOneTemps.map(e => {
                        return {
                            id: e.id,
                            name: e.name,
                            temperament: e.temperament,
                            image: e.image.url,
                            weight: e.weight.metric,
                            height: e.height.metric
                        }
                    }) 
                }
                
                let resultsBdRoute = [...dogsFilters, ...bdbreeds]   
                res.json(resultsBdRoute)
            }
            
        } else {
            //Filtro para multiples temperamentos
            let filterMultipleTemps = temperamentsNulls.filter((dog) => temps.every((temp) => dog.temperament.includes(temp)))
            let querys = []
            for (let index = 0; index < temps.length; index++) {
                const element = {[Op.substring]: temps[index]}
                querys.push(element)
            } 
            const bdbreeds = await Dog.findAll({
                where: {
                    temperament : {
                        [Op.and]: querys
                        
                    }
                }
            }) 
            
            if(filterMultipleTemps.length === 0 && bdbreeds.length === 0)   {
                res.send("No hay resultados")
            } else {
                let dogsFilters = []
                if (filterMultipleTemps.length !== 0) {
                    dogsFilters = filterMultipleTemps.map(e => {
                        return {
                            id: e.id,
                            name: e.name,
                            temperament: e.temperament,
                            image: e.image.url,
                            weight: e.weight.metric,
                            height: e.height.metric
                        }
                    }) 
                }
                let resultsBdRoute = [...dogsFilters, ...bdbreeds]   
                res.json(resultsBdRoute)
            }
            
        }
    }
    }}
        catch(e){
            console.log(e);
            res.send("Hubo un error con el servidor");
        }
    })



    module.exports = router;
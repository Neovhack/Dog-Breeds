const { Router } = require('express');
const { Temperament } = require('../db.js')

const router = Router();

const url = "https://api.thedogapi.com/v1/breeds"

router.get("/", async (req, res) => {
        try {
                let ArrTemperaments = []
                let fetcher = await fetch(url)
                let data = await fetcher.json()
                let temperamentsFetcherNulls = data.map(e => e.temperament)
                let temperamentsFetcher = temperamentsFetcherNulls.filter(e => !(e === undefined))
                let temperamentsInArrays = temperamentsFetcher.map(e => e.split(","))
                temperamentsInArrays.map(e => {
                    for (let index = 0; index < e.length; index++) {
                        ArrTemperaments.push(e[index])                    
                    }
                })
             
                let repeatedWords = [];
                let uniqueWords = [];
                ArrTemperaments.forEach(value => {
                    ArrTemperaments.filter(el => el === value).length > 1
                ? repeatedWords.push(value)
                : uniqueWords.push(value);
                });
                const uniqueRepeatedWords = [...new Set(repeatedWords)]
    
                 const allTemps = await Temperament.findAll() 
                if(allTemps.length === 0) {
                    for (let index = 0; index < uniqueRepeatedWords.length; index++) {
                        let temptrim = uniqueRepeatedWords[index].trim()
                        let newTemp = await Temperament.create({
                            name: temptrim
                        })
                    }
                    const allTemps = await Temperament.findAll()  
                    res.send(allTemps)
                } else {
                    res.send(allTemps)
                }  
        } catch (error) {
            res.send(error);
        }
})


module.exports = router;

const { Country } = require('../db');
const axios = require('axios');

const URL = "http://localhost:5000/countries";

async function getAllCountries(req , res){
    try{
      const count = await Country.count();
    if (count === 0) {
        const response = (await axios.get(`${URL}`));
        const paises = response.data;
    for (const pais of paises) {
      // Crear un registro en la base de datos utilizando el modelo Country
      await Country.create({
        countryId: pais.cca3,
        name: pais.translations.spa.common,
        flag: pais.flags?.png ,
        continent: pais.region ,
        capital: Array.isArray(pais.capital) ? pais.capital.map(c => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).join(",") : '',
        subregion: pais.subregion ,
        area: pais.area ,
        population: pais.population 
      });
    }
  }
  // Obtener todos los países de la base de datos
  const countries = await Country.findAll();
        res.status(200).json(countries);        
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getAllCountries;
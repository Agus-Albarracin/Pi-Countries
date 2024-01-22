const axios = require ('axios');
const URL = "http://localhost:5000/countries"
const { Country } = require('../../db');

const syncApiDb = async () => { 
    try {
        const { data } = await axios.get(URL);
        const mapCountries = data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                image: country.flags.png,
                continente: country.region,
                capital: country.capital ? country.capital[0] : 'No tiene.',
                subregion: country.subregion ? country.subregion : 'No tiene.',
                area: country.area,
                poblacion: country.population,
            }
        });
        await Country.bulkCreate(mapCountries);
        console.log('Paises cargados a la base de datos correctamente');
    } catch (error) {
        console.error('Error en la carga de paises');
    }
}

module.exports = syncApiDb; 

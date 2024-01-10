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
//20 - Es posible que a menudo te encuentres con escenarios en los que necesites insertar varias filas en una tabla de base de datos.Sequelize proporciona el método bulkCreate(), que le permite agregar varias filas de manera eficiente en una sola operación. Los datos que desea insertar en su tabla deben pasarse como una matriz de objetos al método.

//Esta función me permite asegurar que los datos desde la API o del localhost se carguen correctamente.
//donde a través de un .map por cada elemento vamos a retornar un objeto con sus atributos asignandole los atributos traidos desde la api.

//Después lo que vamos hacer es agregar todos los elemento al mismo tiempo en varias filas a la base de datos. con el bulkCreate

//Desde mi punto de vista es recomendable ejectuar este funcion antes de levantar el servidor. Para tener cargados los elementos en la base de datos.
const { Country, Activity } = require('../../db');

const getCountries = async (req, res) => {
    try {
        let allCountries = await Country.findAll({
            include: Activity,
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        allCountries = allCountries.map(country => country.get());
        return res.status(200).json(allCountries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = getCountries;

// req y res son objetos.

// el metodo findAll nos devuelve una promesa que resuelve una array de instancias(objetos) que en este caso son los modelos
// con sus atributos y valores 

//linea 6 - el " include: "nos permite incluir la asociación entre los modelos de la base de datos.
// Osea que nos va a devolver todas las tablas relacionadas entre country y activity

//linea 7 - el " exclude: " nos permite excluir(quitar) los atributos en este caso "createdAt" y "updateAt"

//linea 9 - el metodo get de Sequelize se utiliza para aplicarlos a las instancias(objetos) de los modelos.
// nos devuelve los datos limpios(los atributos) que fueron declarados en el modelo
// que armamos sin incluir los metadatos que a veces se incluyen como por ejemplo createdAt y updateAt



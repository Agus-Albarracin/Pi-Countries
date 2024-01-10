const { Country } = require('../../db');

const getCountryByName = async (req, res) => {
    try {
        let { name } = req.query;
        if (!name) return res.status(400).send('Ingrese el nombre en la consulta');
        const countryByName = await Country.findOne({where: {name: name}});
        if (!countryByName) return res.status(404).send('País no encontrado');
        res.status(200).json(countryByName);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

module.exports = getCountryByName;
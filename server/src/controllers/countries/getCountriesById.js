const { Country } = require('../../db');

const getCountriesById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) return res.status(400).send('Falta ID')
        const countryById = await Country.findOne({where: {id:id}});
        if (!countryById) return res.status(404).send('País no encontrado');
        return res.status(200).json(countryById);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = getCountriesById;


const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const getCountriesByName = async (req, res) => {
    const name = req.query.name
    const countriesList = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%`} },
        include: [ {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes: [] },
        }]
    });

    res.status(200).json(countriesList);    //retorno todo lo que hay dentro de filtered
                                             //y todo lo que hay dentro de countriesList en nuevo array
}

module.exports = getCountriesByName;
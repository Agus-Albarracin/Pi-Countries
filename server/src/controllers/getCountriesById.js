const axios = require('axios');
const { Country, Activity } = require('../db');

async function getCountriesById(req , res){
    let { idPais } = req.params;
    console.log({idPais});
    try{
        const countryId = await Country.findByPk(idPais, {
            include: {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
        }})
        res.status(200).json(countryId);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getCountriesById;
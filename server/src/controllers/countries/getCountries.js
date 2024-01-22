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





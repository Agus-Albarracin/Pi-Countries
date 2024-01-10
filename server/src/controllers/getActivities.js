const { Activity, Country } = require('../db');

const getActivities = async (req, res) => {
    try {
        const Activities = await Activity.findAll({
            include: {
            model: Country,
            attributes: ["name"],
        }});
        res.json(Activities)
    } catch (error) {
        return res.status(500),json({message: error.message})
    }
};

module.exports = getActivities;
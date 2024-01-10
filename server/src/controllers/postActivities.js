const { Activity, Country } = require('../db');

const postActivities = async (req, res) => {
    const { name, difficulty, duration, season, countries} = req.body;
    console.log({ name, difficulty, duration, season, countries})
    try{
    const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
    })
    let countryfinded = await Country.findAll({
        where: {name: countries}
    });
    console.log(countryfinded);
    await newActivity.addCountry(countryfinded);    
    res.status(200).json(newActivity)
    } catch (error) {
    return res.status(500).json({message: error.message})
    }
};

module.exports = postActivities;
const { Activity, Country } = require ('../../db');

const getActivities = async (req,res) => {
    try {
        let allActivities = await Activity.findAll({
            include: {
                model: Country,
                through: { attributes: []},
                attributes: ["name"]
                //Esta funcion me permite traer solo el nombre del country
            }
        });
        if (allActivities.length === 0) return res.status(404).json('No se encontraron actividades');
        allActivities = allActivities.map(activity => {
            activity = activity.get({ plain: true });
            // el .get() nos trae informacion de la base de datos.
            // el plain me trae devuelve el objeto vacio. valor por default es true;
            // lo que me va a devolver una nueva instancia.
            activity.Countries = activity.Countries.map(country => country.name);
            return activity;
        })
        return res.status(200).json(allActivities)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = getActivities;
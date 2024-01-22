const { Activity, Country } = require ('../../db');

const getActivities = async (req,res) => {
    try {
        let allActivities = await Activity.findAll({
            include: {
                model: Country,
                through: { attributes: []},
                attributes: ["name"]
            }
        });
        
        if (allActivities === undefined) return res.status(404).json('No se encontraron actividades');
        // if(allActivities.lenght === 0)
        //el condicional .lenght me tirando un error como si la ruta no se encontraba, a pesar de que existia cuando la comunicaba con
        //el front, ya que su condicional era si tenia un array en 0


        allActivities = allActivities.map(activity => {
            activity = activity.get({ plain: true }); 
        //sin el plain true, no me deja acceder a los atributos.
        //con el plain true se comporta como un objeto.
            activity.Countries = activity.Countries.map(country => country.name);
            return activity;

        })
        return res.status(200).json(allActivities)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = getActivities;
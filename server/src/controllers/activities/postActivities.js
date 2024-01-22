const { Activity, Country } = require ('../../db');

const postActivities = async(req, res) => {
    try {
        const { name, dificultad, duracion, temporada, countries } = req.body;
        if (!name || !dificultad || !duracion || !temporada || !countries) return res.status(400).json('Faltan datos');
       

        let [actividad, seCreoActividad] = await Activity.findOrCreate({

            where: { name },
            defaults: {
            name,
            dificultad,
            duracion,
            temporada
            }
        });

        // Si la actividad ya existía, retorna un código de estado 409 (conflicto)
        // Si no se creo la actividad || ya existia? return ->
        if(!seCreoActividad) return res.status(409).json('La actividad ya existe');

       
        // Busca los países que coinciden con los nombres proporcionados
        const paisesSeleccionados = await Country.findAll({
            where: { name: countries }
        });
        

        await actividad.setCountries(paisesSeleccionados);
        
        //si se completo, retorname la actividad
        res.status(201).json(actividad);


    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = postActivities;
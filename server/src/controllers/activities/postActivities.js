const { Activity, Country } = require ('../../db');

const postActivities = async(req, res) => {
    try {
        const { name, dificultad, duracion, temporada, countries } = req.body;
        
        if (!name || !dificultad || !duracion || !temporada || !countries) return res.status(400).json('Faltan datos');
        let [actividadCreada, creada] = await Activity.findOrCreate({
            where: { name },
            defaults: {
            name,
            dificultad,
            duracion,
            temporada
            }
        });

        if(!creada) return res.status(409).json('La actividad ya existe');
        const paisesSeleccionados = await Country.findAll({
        // el metodo findAll recupera todas las entrada de la tabla y en caso de que 
        // le pasemos un where: { key : value} este recuperara solo las entradas de los key : value que le pasemos
            where: { name: countries }
        });

        await actividadCreada.setCountries(paisesSeleccionados);
        //el metodo set"Nombredelatabla" relacionara las tablas a las variables que 
        //le asignemos la funcion set y a la variable que le pasemos por parametro.
        // ejemplo variableA.setNombredelatabla(variableB) 
        res.status(201).json(actividadCreada);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = postActivities;
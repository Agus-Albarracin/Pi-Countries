const { Activity, Country } = require ('../../db');

const postActivities = async(req, res) => {
    try {
        const { name, dificultad, duracion, temporada, countries } = req.body;
        if (!name || !dificultad || !duracion || !temporada || !countries) return res.status(400).json('Faltan datos');
       

        // La función findOrCreate devuelve un array con dos elementos. 
        // El primer elemento es el resultado de la búsqueda o la instancia creada, 
        // y el segundo elemento es un booleano que indica si la instancia fue creada o ya existía.
        // Por lo tanto en el destruccturing de array, se le asigna a los elementos en roden el valor dicho.
        let [actividad, seCreoActividad] = await Activity.findOrCreate({

            // Busca una actividad por nombre o crea una nueva si no existe
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
        
        // Establece la relación entre la actividad creada y los países seleccionado
        // el metodo set"Nombredelatabla" relacionara las tablas a las variables que 
        // le asignemos la funcion set y a la variable que le pasemos por parametro.
        // ejemplo variableA.setNombredelatabla(variableB)
        await actividad.setCountries(paisesSeleccionados);
        
        //si se completo, retorname la actividad
        res.status(201).json(actividad);


    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = postActivities;
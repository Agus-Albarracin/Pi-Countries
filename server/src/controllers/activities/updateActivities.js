const {Activity} = require("../../db")

    const updateActivity = async (req, res) => {
        try {
          // Obtén los valores del cuerpo de la solicitud
          const { originalName, name, dificultad, duracion, temporada, countries } = req.body;
      
          // Encuentra la actividad existente por su nombre original
          const existingActivity = await Activity.findOne({ name: originalName });
      
          // Si no se encuentra la actividad, lanza un error
          if (!existingActivity) {
            return res.status(404).json({ message: "Actividad no encontrada" });
          }
      
          // Actualiza los campos solo si se proporcionan y son diferentes
          if (name !== undefined) existingActivity.name = name;
          if (dificultad !== undefined) existingActivity.dificultad = dificultad;
          if (duracion !== undefined) existingActivity.duracion = duracion;
          if (temporada !== undefined) existingActivity.temporada = temporada;
          if (countries !== undefined) existingActivity.countries = countries;
      
          // Guarda los cambios en la base de datos
          await existingActivity.save();
      
          // Envía una respuesta exitosa
          res.status(200).json({ message: "Actividad actualizada con éxito" });
        } catch (error) {
          // Maneja los errores y envía una respuesta con el mensaje correspondiente
          console.error(error);
          res.status(500).json({ message: "Error al procesar la solicitud" });
        }
      };
  
  // ... (otro código)
  
  module.exports = updateActivity

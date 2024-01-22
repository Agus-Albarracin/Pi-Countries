const {Activity} = require("../../db")

    const updateActivity = async (req, res) => {
        try {
          
          const { originalName, name, dificultad, duracion, temporada, countries } = req.body;
          if (!originalName || !name || !dificultad || !duracion || !temporada || !countries){
            return res.status(400).json({message: "Faltan datos."})
          }
      

          const existingActivity = await Activity.findOne({ name: originalName });

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
      
          res.status(200).json({ message: "Actividad actualizada con éxito" });
        } catch (error) {
          
          console.error(error);
          res.status(500).json({ message: "Error al procesar la solicitud" });
        }
      };
  
  module.exports = updateActivity

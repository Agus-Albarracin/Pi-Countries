const { Activity, Country } = require('../../db');

const addCountriesToActivity = async (req, res) => {
    
  try {
    const { activityName, countries } = req.body;

    // Buscar la actividad por nombre
    const activity = await Activity.findOne({
      where: { name: activityName }
    });

    if (!activity) {
      return res.status(404).json('Actividad no encontrada');
    }

    // Buscar los países que coinciden con los nombres proporcionados
    const selectedCountries = await Country.findAll({
      where: { name: countries }
    });

    if (!selectedCountries || selectedCountries.length === 0) {
      return res.status(404).json('Países no encontrados');
    }

    // Agregar los países a la actividad
    await activity.addCountries(selectedCountries);

    // Obtener la actividad actualizada con los países agregados
    const updatedActivity = await Activity.findOne({
      where: { name: activityName },
      include: {
        model: Country,
        through: { attributes: [] },
        attributes: ["name"]
      }
    });

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const removeCountryFromActivity = async (req, res) => {
    try {
      const { activityName, countryName } = req.body;
  
      // Buscar la actividad por nombre
      const activity = await Activity.findOne({
        where: { name: activityName }
      });
  
      if (!activity) {
        return res.status(404).json('Actividad no encontrada');
      }
  
      // Buscar el país que coincide con el nombre proporcionado
      const countryToRemove = await Country.findOne({
        where: { name: countryName }
      });
  
      if (!countryToRemove) {
        return res.status(404).json('País no encontrado');
      }
  
      // Eliminar el país de la actividad
      await activity.removeCountries(countryToRemove);
  
      // Obtener la actividad actualizada después de eliminar el país
      const updatedActivity = await Activity.findOne({
        where: { name: activityName },
        include: {
          model: Country,
          through: { attributes: [] },
          attributes: ["name"]
        }
      });
  
      res.status(200).json(updatedActivity);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = removeCountryFromActivity;
module.exports = addCountriesToActivity;
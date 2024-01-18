const { Activity, Country } = require('../../db');

const manageActivityCountries = async (req, res) => {
  try {
    const { activityName, action, countries, countryName } = req.body;

    // Buscar la actividad por nombre
    const activity = await Activity.findOne({
      where: { name: activityName }
    });

    if (!activity) {
      return res.status(404).json('Actividad no encontrada');
    }

    if (action === 'add') {
      // Agregar los países a la actividad
      const selectedCountries = await Country.findAll({
        where: { name: countries }
      });

      if (!selectedCountries || selectedCountries.length === 0) {
        return res.status(404).json('Países no encontrados');
      }

      await activity.addCountries(selectedCountries);
    } else if (action === 'remove') {
      // Buscar el país que coincide con el nombre proporcionado
      const countryToRemove = await Country.findOne({
        where: { name: countryName }
      });

      if (!countryToRemove) {
        return res.status(404).json('País no encontrado');
      }

      // Eliminar el país de la actividad
      await activity.removeCountries(countryToRemove);
    } else {
      return res.status(400).json('Acción no válida');
    }

    // Obtener la actividad actualizada después de realizar la acción
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

module.exports = manageActivityCountries
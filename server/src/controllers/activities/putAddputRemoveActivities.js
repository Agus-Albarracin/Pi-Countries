const { Activity, Country } = require('../../db');

const actionsActivityCountries = async (req, res) => {
  try {
    const { activityName, action, countries, countryName } = req.body;

    const activity = await Activity.findOne({
      where: { name: activityName }
    });

    if (!activity) {
      return res.status(404).json('Actividad no encontrada');
    }

    //* ADD
    if (action === 'add') {
      const selectedCountries = await Country.findAll({
        where: { name: countries }
      });

      if (!selectedCountries || selectedCountries.length === 0) {
        return res.status(404).json('Países no encontrados');
      }

      await activity.addCountries(selectedCountries);


    //*REMOVE
    } else if (action === 'remove') {

      const countryToRemove = await Country.findOne({
        where: { name: countries }
      });

      if (!countryToRemove) {
        return res.status(404).json('País no encontrado');
      }

      await activity.removeCountries(countryToRemove);
    } else {
      return res.status(400).json('Acción no válida');
    }


    // Actualizar la actividad despues de cada acción.
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

module.exports = actionsActivityCountries
const { Activity } = require('../../db');

const deleteActivities = async (req, res) => {
  try {
    const { activityName } = req.body;
    if(!activityName) {
      
      return res.status(404).send("La actividad no existe")
    }

    await Activity.destroy({
      where: { name: activityName }
    });

    return res.status(200).json({ message: 'Actividad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor"});
  }
};

module.exports = deleteActivities;
const { Activity } = require('../../db');

const deleteActivities = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    await activity.destroy();

    return res.status(200).json({ message: 'Actividad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteActivities;
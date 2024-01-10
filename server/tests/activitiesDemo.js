const { Router } = require("express");

const router = Router();

// Función para devolver actividades simuladas
const getSimulatedActivities = () => {
    return [
      { id: 1, name: 'Actividad 1', duracion: 1, dificultad: 1, temporada:"Verano", countries:["Iraq", "Argentina"] },
      { id: 2, name: 'Actividad 2' },
      // Agrega más actividades simuladas si es necesario
    ];
};
  
// Ruta para obtener la lista de actividades
router.get('/activities', (req, res) => {
    const activities = getSimulatedActivities();
    res.status(200).json(activities);
});

module.exports = router;
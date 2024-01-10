
const getAllCountries = require('../controllers/getAllCountries')
const getCountriesByName = require('../controllers/getCountriesByName')
const getCountriesById = require('../controllers/getCountriesById')
const postActivities = require('../controllers/postActivities')
const getActivities = require('../controllers/getActivities');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', getAllCountries);
router.get('/countries/name', getCountriesByName );
router.get('/countries/:idPais', getCountriesById);
router.post('/activities', postActivities);
router.get('/activities', getActivities);

module.exports = router;
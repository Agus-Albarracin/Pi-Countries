const { Router } = require("express");
// Activities
const getActivities = require('../controllers/activities/getActivities')
const postActivities = require('../controllers/activities/postActivities')
// prueba del nuevo put
const addremoveActivities = require("../controllers/activities/putAddputRemoveActivities")
const updateActivities = require("../controllers/activities/updateActivities")
const deleteActivities = require("../controllers/activities/deleteActivities")

// Countries
const getCountries = require('../controllers/countries/getCountries')
const getCountriesById = require('../controllers/countries/getCountriesById')
const getCountryByName = require('../controllers/countries/getCountriesByName')


//User

const singUpUser = require("../controllers/singAndLogin/singup")
const logInUser = require("../controllers/singAndLogin/logIn")

const router = Router();

router.get('/countries', getCountries)
router.get('/countries/:id', getCountriesById)
router.get('/country', getCountryByName)

router.get('/activities', getActivities)
router.post('/activities', postActivities)
router.put("/activities", addremoveActivities)
router.put("/updateactivities", updateActivities)
router.delete("/activities", deleteActivities)


router.post("/login", logInUser)
router.post("/singup", singUpUser)


module.exports = router;

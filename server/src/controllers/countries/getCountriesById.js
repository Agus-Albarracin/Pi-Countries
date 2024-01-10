const { Country } = require('../../db');

const getCountriesById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) return res.status(400).send('Falta ID')
        const countryById = await Country.findOne({where: {id:id}});
        if (!countryById) return res.status(404).send('País no encontrado');
        return res.status(200).json(countryById);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = getCountriesById;


//linea 5: req.params permite acceder a los parametros de una URL ejemplo: /countries/:id, acceder a :id
// al mismo tiempo lo que contendra esa variable id = es a lo que se accedio de :id

//el metodo finOne se encargara de hacer la busqueda de un solo registro, que lo devuelve en forma de objeto.
// donde el objeto where: especifica que el registro que se busca debe contener id: que sea igual al id que
// se obtuvo anteriormente de req.params

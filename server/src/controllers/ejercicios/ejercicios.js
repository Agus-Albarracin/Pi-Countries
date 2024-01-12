const {Country} = require ("../../db")

const deleteCountry = async(req, res) => {
    let {id} = req.params
    
    try{
    let deletecountry = await Country.findByPk(id);
    if(!deletecountry) res.status(400).send("falta un id");
    
    await deletecountry.destroy()
    res.status(200).send("se elimino exitosamente");


    }catch(error){
        return res.status(500).json({message: error.message})
    }

}
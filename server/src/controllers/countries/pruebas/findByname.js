const {Countries} = require("../../db");

const findname = async(req, res) =>{
    try{ 
    let { name } = req.query;
    if(!name) return res.status(404).send("falta un nombre");

    let findthename = await Countries.findOne({where:{name:name}});
    if(!findthename) return res.status(404).send("no se encontro el nombre")

    return res.status(200).json(findthename)

    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = findname

const {Countries, Activites} = requiere("db");

const getCountries = async(req, res) =>{
   try{  
   
    const getAll = await Countries.findAll({
        includes : Activites,
        attributes: { exclude:["updateAt"]},
    });
    
    if(!getAll) return res.status(404).send("hubo un error al cargar")
    
    getAll = getAll.map(ele => ele.get());
    return res.status(200).json(getAll)


   }catch(error){
    return res.status(500).json({message : error.message})
   }

}

const getById = async (req, res) => {
    
    try{

    let {id} = req.params
    if (!id) return res.status(400).send("falta un id")
    let findId = await Countries.findOne({where: {id : id}});
    if(!findId) return res.status(400).send("no se encotro el id")
    return res.status(200).json(findId);


    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getByname = async(req, res) => {
    try{

    let {name} = req.query
    if(!name) return res.status(400).send("ingrese un nombre")
    const findname = await Countries.findOne({ where: {name:name}});
    if(!findname) return res.status(404).send("no se encotro el name");
    return res.status(200).json(findname);


    }catch(error){
        return res.status(500).json({message: error.message })
    }
}


const deletepais = async (req, res) => {
    try{ 

    let {id} = req.params 

    const findfordelete = await Countries.findByPk(id);
    if(!findfordelete) return res.status(400).send("no se encontro id")
    
    findfordelete.destroy();
    return res.status(200).json({message: "Se borro existosamente."})




    }catch(error){
        return res.status(500).json({message: error.message })
    }
}


module.exports = getById, getByname, getCountries, deletepais
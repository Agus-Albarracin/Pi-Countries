const {Countries} = requiere("db");


const findById = async (req, res) =>{
   try{
     const {id} = req.params
     if(!id) return res.status(404).send("falta un id")
     let findId = await Countries.findOne({where: {id:id}})
     if(!findId){
        return res.status(404).send("no se encontro id")

     }else {
        return res.status(200).json(findId)
    }
   }catch(error){
     return res.status(500).json({message: error.message})
   }
}


module.exports = findById;
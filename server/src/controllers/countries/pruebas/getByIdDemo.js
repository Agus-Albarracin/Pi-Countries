const {Country, Activities} = require("../../db")

const getsid = async (req, res) => {
   const {id} = req.params;

   try{
      let getbyid = await Country.findOne({where:{id:id}})
      if(!getbyid){return res.status(400).send("no se encontro")}
      return res.status(200).json(getbyid)

   }catch(error){
      return res.status(500).json({message: error.message})
   }
}

module.exports = getsid
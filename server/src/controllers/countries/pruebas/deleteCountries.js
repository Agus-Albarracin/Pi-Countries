const {Country} = require("db");


const deleteCountry = async (req, res) =>{
   const {id} = req.params
 try{
     let findForDelete = await Country.findByPk(id);
     if(!findForDelete){
        return res.status(400).json({message: "no se encontro"})
     } else {
        findForDelete.destroy();
        return res.status(200).json({message: "se borro."})
     }
 }catch(error){
    return res.status(500).json({message: error.message})
 }

}
const { Countries,Activities } = requiere("../../db");

const getCountriess = async (req, res) =>{
    try{
   
    let getAllcountries = await Countries.findAll({
        includes: Activities,
        attributes: { exclude : ["updateAt"]},
    })
    if(!getAllcountries){
        return res.status(404).json({message: "hay un error al cargar"})
    } else {

        getAllcountries = getAllcountries.map(ele => ele.get());
        return res.status(200).json(getAllcountries)
    }


    }catch(error){
        return res.status(500).json({message: error.message})
    }
}


module.exports = getCountriess

const {Dogs, Temperaments} = require ("../../db")

const gets = async (req, res) => {
    try{
     let allgets = await Dogs.findAll({
        include: Temperaments,
        attributes: {exclude: ["createdAt", "updateAt"]}
     })
     if(!allgets){return res.status(400).json({message: error.message})}

     allgets = allgets.map(e => e.get())
     return res.status(200).json(allgets)

    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = gets
const {User} = require("../../db")


const singUpUser = async (req, res) => {
    
    try{
    let {email, password} = req.body;
    if(!email || !password) return res.status(400).send("Faltan ingresar datos.")

    let [user, seCreoUser] = await User.findOrCreate({
        where:{email},
        defaults: {
            email,
            password
        }
    })

    if(!seCreoUser) return res.status(400).send("El usuario ya existe.")

    return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({message: error.message})
    }

}

module.exports = singUpUser
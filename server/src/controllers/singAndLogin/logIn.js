const { User } = require("../../db");

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("Faltan datos");
      return res.status(400).json({ success: false, message: "Faltan datos." });
    }
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      console.log("POST / Usuario o contraseña incorrectos");
      return res.status(404).json({ success: false, message: "Los datos son incorrectos." });
    }
    console.log("POST / Hubo un inicio de sesión éxitoso.")
    return res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });

  } catch (error) {

    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = logInUser;
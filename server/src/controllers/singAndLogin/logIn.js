const { User } = require("../../db");

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si los campos están presentes y no son cadenas vacías
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Faltan datos." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(404).json({ success: false, message: "Los datos son incorrectos." });
    }

    // Puedes usar bcrypt o alguna otra librería para comparar contraseñas de manera segura

    // Envía una respuesta más descriptiva en caso de éxito
    return res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });

  } catch (error) {
    // Envía un objeto más informativo en caso de error
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = logInUser;
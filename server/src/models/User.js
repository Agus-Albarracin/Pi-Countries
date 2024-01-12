const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Asegura que el correo electrónico sea único
            validate: {
              isEmail: true, // Validación de formato de correo electrónico
            },
          },

          password: {
            type: DataTypes.STRING, // Acepta todo tipo de caracteres para password.
            allowNull: false,
          },
    }, 
    {timestamps: false}
    )

};
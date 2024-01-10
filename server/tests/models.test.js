const { DataTypes } = require('sequelize');
const defineActivityModel = require('../src/models/Activity'); // Asegúrate de tener la ruta correcta

describe('Definir un modelo correctamente.', () => {
    const sequelizeMock = {
        define: jest.fn(),
    };

    const Activity = defineActivityModel(sequelizeMock);

    it('Deberia definir una actividad correctamente', () => {
        expect(Activity).toBeDefined();
        expect(sequelizeMock.define).toHaveBeenCalledWith('Activity', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dificultad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            duracion: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            temporada: {
                type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
                allowNull: false,
            },
        });
    });
});   
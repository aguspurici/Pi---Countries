const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("activity", {
        id: {
            type: DataTypes.UUID, //identificador único universal
            primaryKey: true,
            unique: true,
          },
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"), //lista predefinida de valores
            allowNull: false,
        },
        duration: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
            allowNull: false,
        },
    },)
};
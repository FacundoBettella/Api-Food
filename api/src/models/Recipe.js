const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo.
// Luego le injectamos la conexion a sequelize.
// El modelo es una tabla en la database.
module.exports = (sequelize) => {
  // defino el modelo
  let Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey: true,
    },    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, //For avoid updatedAt an createdAt
  });
  return Recipe;
};



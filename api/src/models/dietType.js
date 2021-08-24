const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo.
// Luego le injectamos la conexion a sequelize.
// El modelo es una tabla en la database.
module.exports = (sequelize) => {
  let DietType = sequelize.define('DietType', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: false, //For avoid updatedAt an createdAt
  });
  return DietType;
};

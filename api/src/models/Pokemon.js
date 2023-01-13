const { UUID } = require("sequelize");
const { UUIDV4 } = require("sequelize");
const { DataTypes } = require('sequelize');
// export function who defines the model
// inject the conexion to sequalize
module.exports = (sequelize) => {
  // define model 
  sequelize.define('pokemon', {
    id:{
      type: UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

};

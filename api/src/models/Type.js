const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // define model
    sequelize.define('type', {
  
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
  };
const sequelize = require('sequelize');

const CreateCategory = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
     },
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
    timestamps: false
  })
  return Category;
}

module.exports = CreateCategory;
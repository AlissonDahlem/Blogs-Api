const sequelize = require("sequelize");

const CreateUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    timestamps: false
  })
  User.associate = (db) => {
    User.hasMany(db.BlogPost, { as: 'BlogPosts', foreignKey: 'userId'})
  }
  
  return User;
}

module.exports = CreateUser;
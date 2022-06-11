'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

// TODO Userモデルを定義する
class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;
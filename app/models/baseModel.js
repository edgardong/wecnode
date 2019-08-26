const {
  Sequelize,
  Model,
  DataTypes,
  BuildOptions,
  Op
} = require('sequelize')

const {
  sequelize
} = require('../../core/db')

module.exports = {
  Sequelize,
  sequelize,
  Model,
  DataTypes,
  BuildOptions,
  Op
}
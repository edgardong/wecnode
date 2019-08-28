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

function getLastPage(total, size) {
  let last = 0
  let tmp = total % size
  let tmp2 = ~~(total / size)
  last = tmp == 0 ? tmp2 : tmp2 + 1
  return last
}

module.exports = {
  Sequelize,
  sequelize,
  Model,
  DataTypes,
  BuildOptions,
  Op,
  getLastPage
}
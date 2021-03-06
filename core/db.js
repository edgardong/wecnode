const Sequelize = require('sequelize')

const {
  dbName,
  user,
  password,
  host,
  port,
  dbType
} = require('../config/config').database


const options = {
  dialect: dbType,
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    underscored: true
  },
  // 添加这个配置
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
}

const sequelize = new Sequelize(dbName, user, password, options)

sequelize.sync({
  force: false,
  alter: false
})

module.exports = {
  sequelize
}
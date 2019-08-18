const {
  Sequelize,
  Model,
  Op
} = require('sequelize')

const {
  sequelize
} = require('../../core/db')

class UserAddress extends Model {}

UserAddress.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    comment: '收货人姓名'
  },
  mobile: {
    type: Sequelize.STRING(20),
    comment: '收货人联系方式'
  },
  province: {
    type: Sequelize.STRING(20),
    comment: '省份'
  },
  city: {
    type: Sequelize.STRING(20),
    comment: '城市'
  },
  country: {
    type: Sequelize.STRING(20),
    comment: '县/区'
  },
  detail: {
    type: Sequelize.STRING(100),
    comment: '详细地址'
  },
  user_id: {
    type: Sequelize.INTEGER,
    comment: '用户ID'
  },
  zip: {
    type: Sequelize.STRING(10),
    comment: '邮政编码'
  }
}, {
  sequelize,
  tableName: 'user_address'
})

module.exports = {
  UserAddress
}
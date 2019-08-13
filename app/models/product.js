const {
  Sequelize,
  Model,
  Op
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')

class Product extends Model {

}

Product.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '主键'
  },
  name: {
    type: Sequelize.STRING(80),
    comment: '商品名称'
  },
  price: {
    type: Sequelize.DECIMAL(6, 2),
    comment: '价格，单位：分'
  },
  stock: {
    type: Sequelize.INTEGER,
    comment: '库存量'
  },
  category_id: {
    type: Sequelize.INTEGER,
    comment: '所属分类'
  },
  main_img_url: {
    type: Sequelize.STRING,
    comment: '主图ID，'
  },
  from: {
    type: Sequelize.INTEGER,
    comment: '图片来源，1:本地，2:公网'
  },
  summary: {
    type: Sequelize.STRING(50),
    comment: '摘要'
  },
  img_id: {
    type: Sequelize.INTEGER,
    comment: '图片外键'
  }
}, {
  sequelize,
  tableName: 'product'
})

module.exports = {
  Product
}
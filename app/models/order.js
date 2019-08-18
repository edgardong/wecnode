const {
  Sequelize,
  Model,
  Op
} = require('sequelize')

const {
  sequelize
} = require('../../core/db')

class Order extends Model {

  static getUserOrders(user_id, page, limit = 15) {
    console.log(user_id, page, limit)
    const orders = Order.findAll({
      where: {
        user_id
      },
      limit,
      offset: (page - 1) * limit
    })

    return orders
  }

}

Order.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '主键'
  },
  order_no: {
    type: Sequelize.STRING(20),
    comment: '订单号'
  },
  user_id: {
    type: Sequelize.STRING(32),
    comment: '外键，用户ID'
  },
  total_price: {
    type: Sequelize.DECIMAL(6, 2),
    comment: '订单总金额'
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    comment: '订单状态 1:未支付，2:已支付，3:已发货，4:已支付，但库存不足'
  },
  snap_img: {
    type: Sequelize.STRING(255),
    comment: '订单快照图片'
  },
  snap_name: {
    type: Sequelize.STRING(80),
    comment: '订单快照名称'
  },
  total_count: {
    type: Sequelize.INTEGER,
    comment: '订单总数量'
  },
  snap_items: {
    type: Sequelize.TEXT,
    comment: '订单其他快照信息，json形式'
  },
  snap_address: {
    type: Sequelize.STRING(500),
    comment: '地址快照'
  },
  prepay_id: {
    type: Sequelize.STRING(100),
    comment: '支付与订单ID'
  },
  type: {
    type: Sequelize.INTEGER,
    comment: '订单类型 1：支付宝APP, 2:支付宝WEB，3:微信APP，4:微信WEB, 5:微信小程序'
  }
}, {
  sequelize,
  tableName: 'order'
})

module.exports = {
  Order
}
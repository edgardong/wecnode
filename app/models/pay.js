const {
  Order
} = require('./order')
const {
  sequelize
} = require('./baseModel')
const {
  Product
} = require('./product')
const {
  OrderStatus
} = require('../lib/enum')

const WxPay = require('../services/pay/wxpay/wxpay')

class Pay {
  static async preOrder(params) {
    const order = await Order.findOne({
      where: {
        id: params.id
      }
    })
    if (!order) {
      throw new Error('订单数据不存在')
    }
    order.snap_items = JSON.parse(order.snap_items)

    const ids = order.snap_items.map(item => item.id)
    const result = await Order.checkStockByIds(ids, order.snap_items)
    if (result.pass) {
      const data = await WxPay.unifiedOrder(order)
      return data
    }
  }

  /**
   * 订单支付成功后的返回数据
   * @param {Object} data 成功后的返回数据
   */
  static async paySuccess(data) {
    if (data.return_code === 'SUCCESS') {
      const order = await Order.findOne({
        where: {
          order_no: data.out_trade_no
        }
      })
      if (!order) {
        throw new Error('订单数据不存在')
      }
      order.snap_items = JSON.parse(order.snap_items)
      const ids = order.snap_items.map(item => item.id)
      let result = await Order.checkStockByIds(ids, order.snap_items, true)
      // 订单状态
      let orderStatus = OrderStatus.PAID
      if (!result.pass) {
        orderStatus = OrderStatus.PAID_BUT_OUT_OF
      }

      let records = order.snap_items.map(item => {
        let dbRecord = result.data.products.find(i => i.id == item.id)
        return {
          id: item.id,
          stock: dbRecord.dbStock - item.counts
        }
      })

      sequelize.transaction((t) => {
        return Promise.all([ // 更新订单状态
          Order.update({
            status: orderStatus
          }, {
            where: {
              id: order.id
            },
            transaction: t
          }),

          // 减少库存
          Product.bulkCreate(records, {
            updateOnDuplicate: ['stock'],
            transaction: t
          })
        ])
      })

    } else {
      let orderStatus = OrderStatus.UNPAID
      // 修改订单状态为未支付
      Order.update({
        status: orderStatus
      }, {
        where: {
          order_no: data.out_trade_no
        }
      })
    }
  }
}

module.exports = Pay
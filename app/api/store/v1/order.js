const Router = require('koa-router')

const router = new Router({
  prefix: '/api/store/v1/order'
})

const {
  Order
} = require('../../../models/order')

const {
  Auth
} = require('../../../../middlewares/auth')

/**
 * 根据当前用户获取订单
 */
router.get('/by_user', new Auth().m, async (ctx, next) => {
  const orders = await Order.getUserOrders(ctx.auth.uid, ctx.query.page)
  ctx.body = {
    data: {
      data: orders
    }
  }
})

/**
 * 下单操作
 */
router.post('/', new Auth().m, async (ctx, next) => {

})

/**
 * 获取订单详情
 */
router.get('/:id', new Auth().m, async (ctx, next) => {

})

module.exports = router
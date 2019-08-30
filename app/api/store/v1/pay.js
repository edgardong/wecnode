const Router = require('koa-router')
const router = new Router({
  prefix: '/api/store/v1/pay'
})

const {
  Auth
} = require('../../../../middlewares/auth')
const {
  PositiveIntegerValidator
} = require('../../../validators/validator')

const Pay = require('../../../models/pay')

/**
 * 支付预订单
 */
router.post('/pre_order', new Auth().m, async (ctx, next) => {
  const params = await new PositiveIntegerValidator().validate(ctx)
  const result = await Pay.preOrder(params)
  ctx.body = result
})

/**
 * 支付通知
 */
router.post('/notify', async (ctx, next) => {
  const data = ctx.request.body
  const result = await Pay.paySuccess(data)
  ctx.body = ''
})

// router.post('/test', async (ctx, next) => {
//   Pay.paySuccess({
//     return_code: 'SUCCESS',
//     out_trade_no: 'A320669112069497'
//   })
//   ctx.body = ''
// })

module.exports = router
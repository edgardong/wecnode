const Router = require('koa-router')

const router = new Router({
  prefix: '/api/store/v1/product'
})

const {
  Product
} = require('../../../models/product')

const {
  PositiveIntegerValidator
} = require('../../../validators/validator')

router.get('/recent', async (ctx, next) => {
  const products = await Product.getRecent(ctx.query.count || 15)
  Product.prototype.exclude = ['from', 'category_id', 'update_time', 'delete_time', 'create_time']
  ctx.body = products
})

// 根据分类获取产品
router.get('/by_category', async (ctx, next) => {
  const params = await new PositiveIntegerValidator().validate(ctx)
  const products = await Product.getPorductByCategory(params.id)
  Product.prototype.exclude = ['from', 'category_id', 'update_time', 'delete_time', 'create_time']
  ctx.body = products
})

// 获取产品详情
router.get('/:id', async (ctx, next) => {
  const params = await new PositiveIntegerValidator().validate(ctx)
  // console.log(params)
  const product = await Product.getPorductById(ctx.params.id)
  Product.prototype.exclude = ['from', 'category_id', 'update_time', 'delete_time', 'create_time']

  ctx.body = product
})

module.exports = router
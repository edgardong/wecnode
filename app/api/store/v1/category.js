const Router = require('koa-router')
const router = new Router({
  prefix: '/api/store/v1/category'
})

const {
  Category
} = require('../../../models/category')

router.get('/all', async (ctx, next) => {
  const categorys = await Category.getAll();
  Category.prototype.exclude = ['update_time', 'delete_time', 'create_time']
  ctx.body = categorys
})

module.exports = router
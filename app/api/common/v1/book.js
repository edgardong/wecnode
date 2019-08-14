const Router = require('koa-router')
const router = new Router({
  prefix: '/api/common/v1/book'
})

router.get('/latest', async (ctx, next) => {
  ctx.body = {
    'key': 'book'
  }
})

module.exports = router
const Router = require('koa-router')
const router = new Router({
  prefix: '/api/v1/book'
})

router.get('/latest', async (ctx, next) => {
  ctx.body = {
    'key': 'book'
  }
})

module.exports = router
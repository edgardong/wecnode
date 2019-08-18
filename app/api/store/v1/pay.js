const Router = require('koa-router')
const router = new Router({
  prefix: 'api/store/v1/pay'
})

router.post('/pre_order', async (ctx, next) => {

})

module.exports = router
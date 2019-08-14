const Router = require('koa-router')

const router = new Router({
  prefix: '/api/store/v1/order'
})

const {
  Order
} = require('../../../models/order')

router.get('/by_user', async (ctx, next) => {

})

module.exports = router
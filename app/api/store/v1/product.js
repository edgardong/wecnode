const Router = require('koa-router')

const router = new Router({
  prefix: '/api/store/v1/product'
})

const {
  Product
} = require('../../../models/product')

router.get('/recent', async (ctx, next) => {

})

module.exports = router
const Router = require('koa-router')

const router = new Router({
  prefix: '/api/store/v1/address'
})

const {
  Auth
} = require('../../../../middlewares/auth')

const {
  UserAddress
} = require('../../../models/userAddress')

router.get('/', new Auth().m, async (ctx, next) => {
  // console.log(ctx)
  const auth = ctx.auth
  const userAddress = await UserAddress.findOne({
    where: {
      user_id: auth.uid
    }
  })
  ctx.body = {
    data: userAddress
  }
})


module.exports = router
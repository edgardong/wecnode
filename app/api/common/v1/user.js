const Router = require('koa-router')
const router = new Router({
  prefix: '/api/common/v1/user'
})
const {
  User
} = require('../../../models/user')
const {
  WecRegisterValidator
} = require('../../../validators/validator')

router.post('/register', async (ctx, next) => {
  const v = await new WecRegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }

  const r = await User.create(user)
  throw new global.errs.Success()
})

module.exports = router
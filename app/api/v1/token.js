const Router = require('koa-router')
const router = new Router({
  prefix: '/api/v1/token'
})

const {
  TokenValidatar
} = require('../../validators/validator')
const {
  LoginType
} = require('../../lib/enum')
const {
  User
} = require('../../models/user')
const {
  generateToken
} = require('../../../core/util')
const {
  Auth
} = require('../../../middlewares/auth')
const WXManager = require('../../services/wx')

router.post('/', async (ctx, next) => {
  const v = await new TokenValidatar().validate(ctx)
  const type = v.get('body.type', true)
  let token = ''
  switch (type) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      throw new global.errs.NotFound('没有对应的处理方式')
  }
  ctx.body = {
    token
  }
})

/**
 * Email用户登录
 * @param {*} account 用户名
 * @param {*} secret 密码
 */
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
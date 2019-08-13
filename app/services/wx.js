const util = require('util')
const axios = require('axios')

const {
  User
} = require('../models/user')
const {
  Auth
} = require('../../middlewares/auth')

const {
  generateToken
} = require('../../core/util')

class WXManager {

  static async codeToToken(code) {
    //
    const url = util.format(global.config.miniProgram.loginUrl, global.config.miniProgram.appid, global.config.miniProgram.appSecret, code)
    const result = await axios.get(url)
    if (result.status != 200) {
      throw new global.errs.AuthFailed('获取openid失败')
    }
    // console.log(result.data)
    const errcode = result.data.errcode
    if (errcode) {
      throw new global.errs.AuthFailed(result.data.errmsg + " : " + errcode)
    }

    const {
      openid,
      session_key,
      unionid
    } = result.data

    let user = await User.getUserByOpenId(openid)
    if (!user) {
      user = await User.registerUserByOpenId(openid)
    }

    return generateToken(user.id, Auth.USER)

  }
}

module.exports = WXManager
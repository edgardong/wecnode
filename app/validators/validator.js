const {
  WecValidator,
  WecRule
} = require('../../wec-tools')
const {
  User
} = require('../models/user')

const {
  LoginType
} = require('../lib/enum')

class PositiveIntegerValidator extends WecValidator {
  constructor() {
    super()

    this.id = [
      new WecRule('isInt', 'id需要为正整数', {
        min: 1
      })
    ]
  }
}

class WecRegisterValidator extends WecValidator {
  constructor() {
    super()

    this.email = [
      new WecRule('isEmail', '邮箱地址不正确', {})
    ]

    this.password1 = [
      new WecRule('isLength', '密码为6-32位', {
        min: 6,
        max: 32
      }),
      new WecRule('matches', '密码复杂度太低', '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$')
    ]

    this.password2 = this.password1

    this.nickname = [
      new WecRule('isLength', '昵称位6-32位', {
        min: 6,
        max: 32
      })
    ]
  }

  validatePassword(vals) {
    const pass1 = vals.password1
    const pass2 = vals.password2

    if (pass1 !== pass2) {
      throw new Error('两个密码必须相同')
    } else {
      return true
    }
  }

  async validateEmail(vals) {
    const email = vals.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('Email 已存在')
    } else {
      return true
    }
  }
}

class TokenValidatar extends WecValidator {
  constructor() {
    super()

    this.account = [
      new WecRule('isLength', '账号不符合规则', {
        min: 4,
        max: 32
      })
    ]

    this.secret = [
      new WecRule('isOptional'),
      new WecRule('isLength', '至少6位字符', {
        min: 6,
        max: 128
      })
    ]

  }

  validateLoginType(vals) {
    console.log('validateLoginType', vals)
    if (!vals.type) {
      throw new Error('type必须是参数')
    } else if (!LoginType.isThisType(vals.type)) {
      throw new Error('type参数不合法')
    } else {
      return true
    }

  }
}

class NotEmptyValidator extends WecValidator {
  constructor() {
    super()
    this.token = [
      new WecRule('isLength', 'token不能为空', {
        min: 1
      })
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  WecRegisterValidator,
  TokenValidatar,
  NotEmptyValidator
}
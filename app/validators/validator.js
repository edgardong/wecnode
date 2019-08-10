const {
  LinValidator,
  Rule
} = require('lin-mizar')
const {
  User
} = require('../models/user')

const {
  LoginType
} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()

    this.id = [
      new Rule('isInt', 'id需要为正整数', {
        min: 1
      })
    ]
  }
}

class WecRegisterValidator extends LinValidator {
  constructor() {
    super()

    this.email = [
      new Rule('isEmail', '邮箱地址不正确', {})
    ]

    this.password1 = [
      new Rule('isLength', '密码为6-32位', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码复杂度太低', '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$')
    ]

    this.password2 = this.password1

    this.nickname = [
      new Rule('isLength', '昵称位6-32位', {
        min: 6,
        max: 32
      })
    ]
  }

  validatePassword(vals) {
    const pass1 = vals.body.password1
    const pass2 = vals.body.password2

    if (pass1 !== pass2) {
      throw new Error('两个密码必须相同')
    } else {
      return true
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email
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

class TokenValidatar extends LinValidator {
  constructor() {
    super()

    this.account = [
      new Rule('isLength', '账号不符合规则', {
        min: 4,
        max: 32
      })
    ]

    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6位支付', {
        min: 6,
        max: 128
      })
    ]

  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type必须是参数')
    } else if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    } else {
      return true
    }

  }
}

class NotEmptyValidator extends LinValidator {
  constructor(){
    super()
    this.token = [
      new Rule('isLength','token不能为空',{min:1})
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  WecRegisterValidator,
  TokenValidatar,
  NotEmptyValidator
}
const bcrypt = require('bcryptjs')

const {
  Sequelize,
  sequelize,
  DataTypes,
  Model
} = require('./baseModel')

const {
  generateToken
} = require('../../core/util')
const {
  Auth
} = require('../../middlewares/auth')

class User extends Model {

  /**
   * 校验用户名密码是否正确
   * @param {*} email 用户名
   * @param {*} plainPassword 密码
   */
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.AuthFailed('账号或密码错误')
    } else {
      const correct = bcrypt.compareSync(plainPassword, user.password)
      if (!correct) {
        throw new global.errs.AuthFailed('账号或密码错误')
      }
    }

    return user
  }

  /**
   * 根据openid获取用户
   * @param {*} openid
   */
  static async getUserByOpenId(openid) {
    return await User.findOne({
      where: {
        openid
      }
    })
  }

  static async registerUserByOpenId(openid) {
    return await User.create({
      openid
    })
  }

  /**
   * 用户密码登录
   * @param {*} params 
   */
  static async userLogin(params) {
    const user = await User.findOne({
      where: {
        username: params.username
      }
    })

    if (!user) {
      throw new global.errs.AuthFailed('账号或密码错误')
    } else {
      const correct = bcrypt.compareSync(params.password, user.password)
      if (!correct) {
        throw new global.errs.AuthFailed('账号或密码错误')
      }
    }
    return generateToken(user.id, Auth.USER)
  }
}


User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    comment: '用户状态，0可用，1禁用'
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '用户头像'
  },
  wechat: {
    type: DataTypes.STRING,
    comment: '用户微信号'
  },
  qq: {
    type: DataTypes.STRING,
    comment: '用户QQ号'
  },
  mobile: {
    type: DataTypes.STRING(11),
    comment: '用户手机号'
  },
  last_login_time: {
    type: DataTypes.DATE,
    comment: '上次登录时间'
  },
  last_login_ip: {
    type: DataTypes.STRING,
    comment: '上次登录ip'
  },
  usertype: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '用户类型 999:admin, 1:小程序用户 , 2:app 用户 3:web用户'
  },
  email: {
    type: DataTypes.STRING(128),
  },
  password: {
    type: DataTypes.STRING,
    set(val) {
      const sault = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, sault)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: DataTypes.STRING(64),
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}
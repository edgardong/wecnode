const bcrypt = require('bcryptjs')

const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')

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
}


User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  usertype: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    comment: '用户类型 999:admin, 1:小程序用户 , 2:app 用户 3:web用户'
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const sault = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, sault)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}
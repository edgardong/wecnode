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
    console.log(user)
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
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
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
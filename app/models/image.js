const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')

class Image extends Model {
  static async getImage(id) {
    let image = await Image.findByPk(id)
    return image
  }
}

Image.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '主键'
  },
  from: {
    type: Sequelize.INTEGER,
    comment: '1 来自本地，2 来自网络'
  },
  url: {
    type: Sequelize.STRING(255),
    comment: '图片路径'
  }
}, {
  sequelize,
  tableName: 'image'
})

module.exports = {
  Image
}
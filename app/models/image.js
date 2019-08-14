const {
  Sequelize,
  Model
} = require('sequelize')
const {
  unset,
  clone,
  isArray
} = require('lodash')
const {
  sequelize
} = require('../../core/db')

class Image extends Model {
  static async getImage(id) {
    let image = await Image.findByPk(id)
    return image
  }
}

Model.prototype.toJSON = function () {
  let data = clone(this.dataValues)
  unset(data, 'update_time')
  unset(data, 'delete_time')
  if (this instanceof Image) {
    data.url = global.config.imagePrefix + data.url
  }

  if (isArray(this.exclude)) {
    this.exclude.forEach(d => {
      unset(data, d)
    })
  }
  return data
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
    comment: '图片路径',
    // get() {
    //   let from = this.getDataValue('from')
    //   let url = this.getDataValue('url')

    //   console.log('图片路径啊', global.config.imagePrefix, from, url)
    //   return from == 1 ? global.config.imagePrefix + url : global.config.imagePrefix + url
    // }
  }
}, {
  sequelize,
  tableName: 'image'
})

module.exports = {
  Image
}
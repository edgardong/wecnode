const {
  Sequelize,
  Model,
  Op
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')

const {
  Image
} = require('./image')

class Category extends Model {
  static async getAll() {
    const categorys = await Category.findAll({
      include: [{
        model: Image,
        as: 'img'
      }]
    })
    return categorys
  }
}

Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '主键'
  },
  name: {
    type: Sequelize.STRING(50),
    comment: '分类名称'
  },
  topic_img_id: {
    type: Sequelize.INTEGER,
    comment: '图片'
  },
  description: {
    type: Sequelize.STRING(100),
    comment: '分类描述'
  },
  is_check_show: {
    type: Sequelize.BOOLEAN,
    comment: '审核是否显示'
  }
}, {
  sequelize,
  tableName: 'category'
})

Category.hasOne(Image, {
  sourceKey: 'topic_img_id',
  foreignKey: 'id',
  as: 'img'
})

module.exports = {
  Category
}
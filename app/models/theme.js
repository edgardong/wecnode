const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')

class Theme extends Model {}

Theme.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '主键'
  },
  name: {
    type: Sequelize.STRING(50),
    comment: '专题名称'
  },
  description: {
    type: Sequelize.STRING(255),
    comment: '专题描述'
  },
  top_img_id: {
    type: Sequelize.INTEGER,
    comment: '主题图,外键'
  },
  head_img_id: {
    type: Sequelize.INTEGER,
    comment: '专题列表图，头图'
  }
}, {
  sequelize,
  tableName: 'theme'
})

module.exports = {
  Theme
}
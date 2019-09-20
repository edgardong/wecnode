const {
  sequelize,
  DataTypes,
  Op,
  Model
} = require('../baseModel')

class Article extends Model {
  static async getPaginationArticle() {
    const result = await Article.findAll({
      where: {
        status: 0
      },
      attributes: {
        exclude: ['content']
      }
    })
    return result
  }
}

Article.init({
  id: {
    type: DataTypes.INTEGER,
    comment: '主键',
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    comment: '文章标题'
  },
  sub_title: {
    type: DataTypes.STRING,
    comment: '耳机标题'
  },
  type: {
    type: DataTypes.INTEGER,
    comment: '文章类型'
  },
  category: {
    type: DataTypes.INTEGER,
    comment: '文章分类'
  },
  tags: {
    type: DataTypes.STRING,
    comment: '文章标签'
  },
  status: {
    type: DataTypes.INTEGER,
    comment: '文章状态 0: 已发布 1:草稿中'
  },
  content: {
    type: DataTypes.TEXT,
    comment: '文章内容'
  },
  content_type: {
    type: DataTypes.INTEGER,
    default:1,
    comment:'内容类型：1, 富文本编辑 2, markdown编辑'
  },
  introduction:{
    type:DataTypes.STRING,
    comment:'文章简介'
  },
  author_id: {
    type: DataTypes.INTEGER,
    comment: '作者编号'
  },
  author: {
    type: DataTypes.STRING,
    comment: '文章作者'
  },
  is_top: {
    type: DataTypes.BOOLEAN,
    comment: '是否置顶'
  },
  read_count: {
    type: DataTypes.INTEGER,
    comment: '阅读数量'
  },
  desc: {
    type: DataTypes.STRING,
    comment: '文章简介'
  },
  image: {
    type: DataTypes.STRING,
    comment: '文章主图'
  },
  publish_time: {
    type:DataTypes.DATE,
    comment:'发布时间'
  }
}, {
  sequelize,
  tableName: 'blog_article'
})

Article.sync({
  alter: true
})

module.exports = Article
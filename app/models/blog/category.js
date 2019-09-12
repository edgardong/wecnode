const {
  sequelize,
  DataTypes,
  Op,
  Model
} = require('../baseModel')

class Category extends Model {
   static  async getAllCategory(){
      const result = await Category.findAll({
        where: {
          status: 0,
          parent:null
        },
        include:[{
          model:Category,
          as:'children',
          through:{
            attributes:[]
          }
        }]
      })

     return result
   }
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    comment: '主键',
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    comment: '分类名称'
  },
  order: {
    type: DataTypes.INTEGER,
    comment: '分类排序'
  },
  key: {
    type: DataTypes.STRING,
    comment:'分类关键字'
  },
  parent: {
    type: DataTypes.INTEGER,
    comment: '父级分类'
  },
  status: {
    type: DataTypes.INTEGER,
    comment: '分类状态'
  }
}, {
  sequelize,
  tableName: 'blog_category',
  modelName:'blog_category'
})

Category.sync({
  alter: true
})

Category.belongsToMany(Category,{
  through:'blog_category',
  foreignKey:'parent',
  otherKey:'id',
  as:'children'
})

module.exports = Category
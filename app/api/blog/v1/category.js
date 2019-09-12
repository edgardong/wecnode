const Router = require('koa-router')
const router = new Router({
  prefix: '/api/blog/v1/category'
})

const Category = require('../../../models/blog/category')

/**
 * 获取博客分类
 */
router.get('/', async (ctx, next) => {
  Category.prototype.exclude = ['create_time','parent','status']
  const result = await Category.getAllCategory()
  ctx.body = result
})

/**
 * 添加博客分类
 */
router.post('/', async (ctx, next) => {
  const data = {
    status: 0,
    ...ctx.request.body
  }
  const result = await Category.create(data)
  ctx.body = {
    msg: '操作成功'
  }
})

/**
 * 更新博客分类
 */
router.put('/', async (ctx, next) => {
  const data = {
    status: 0,
    ...ctx.request.body
  }
  const result = await Category.update(data,{
    where:{
      id: ctx.request.body.id
    }
  })
  ctx.body = {
    msg: '更新成功'
  }
})

/**
 * 删除博客分类
 */
router.delete('/', async (ctx, next) => {
  const result = await Category.destroy({
    where:{
      id: ctx.request.body.id
    }
  })
  ctx.body = {
    msg: '删除成功'
  }
})

module.exports = router
const Router = require('koa-router')
const router = new Router({
  prefix:'/api/blog/v1/article'
})

const Article = require('../../../models/blog/article')
router.get('/pagination', async (ctx,next)=> {
  const result = await Article.getPaginationArticle()
  ctx.body = result
})

module.exports = router
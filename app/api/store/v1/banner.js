const Router = require('koa-router')
const router = new Router({
  prefix: '/api/store/v1/banner'
})

const {
  Banner
} = require('../../../models/banner')

const {
  PositiveIntegerValidator
} = require('../../../validators/validator')

/**
 * 获取轮播图
 */
router.get('/:id', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const banners = await Banner.getBanner(v.get('path.id'))
  banners.forEach(ba => {
    let url = ba.img.from == 1 ? 'http://localhost' + ba.img.url : 'http://www.edgarhao.cn' + ba.img.url
    ba.img.url = url
  })
  ctx.body = banners
})

module.exports = router
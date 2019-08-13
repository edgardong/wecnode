const Router = require('koa-router')

const router = new Router({
  prefix: '/api/store/v1/theme'
})

const {
  Theme
} = require('../../../models/theme')

router.get('/', async (ctx, next) => {
  const ids = ctx.query.ids
  const themes = await Theme.getThemes(ids)
  Theme.prototype.exclude = ['update_time', 'delete_time', 'create_time', 'head_img_id', 'topic_img_id']
  ctx.body = themes
})

module.exports = router
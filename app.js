const Koa = require('koa')
const parser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')

const catchError = require('./middlewares/exception')
const InitManager = require('./core/init')
const app = new Koa()

app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, 'static')))

InitManager.initCore(app)

app.listen(8000)
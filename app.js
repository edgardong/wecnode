const Koa = require('koa')
const parser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const koaStatic = require('koa-static')
const path = require('path')

const catchError = require('./middlewares/exception')
const InitManager = require('./core/init')
const app = new Koa()

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); // 很奇怪的是，使用 * 会出现一些其他问题
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
    await next();
});

app.use(catchError)
app.use(xmlParser())
app.use(parser())
app.use(koaStatic(path.join(__dirname, 'static')))

InitManager.initCore(app)

app.listen(8000)
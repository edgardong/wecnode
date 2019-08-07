const {
  HttpException
} = require('lin-mizar')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // throw error
    const isHttpException = error instanceof HttpException
    const isDev = global.config.enviroment === 'dev'
    if (isDev && !isHttpException) {
      throw error
    }
    // 处理已知异常
    if (isHttpException) {
      // throw error
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake',
        error_code: 90001,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError;
module.exports = {
  enviroment: 'dev',
  database: {
    dbType: 'mysql',
    dbName: 'wecstore',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'edgardong'
  },
  security: {
    secretKey: 'edgarhao.cn',
    expiresIn: 60 * 60 * 24 * 30
  },
  miniProgram: {
    appid: 'wx9ba5117f7cbce76d',
    appSecret: '29a7809bc04fac72d8af77033eb8fafd',
    loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
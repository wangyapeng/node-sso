
const redisConfig = { // redis配置
    host: 'localhost',          // redis host
    port: 6379,                 // redis port
    db: 0,                     // redis数据库
    password: '',              // redis密码
    ttl: 60 * 60 * 24 * 30,    // redis过期时间
    prefix: 'koa:session:'     // redis key前缀
}   // redis配置

module.exports = { redisConfig }
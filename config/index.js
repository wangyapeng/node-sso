const redisConfig = {
  // redis配置
  host: "localhost", // redis host
  port: 6379, // redis port
  db: 0, // redis数据库
  password: "", // redis密码
  ttl: 60 * 60 * 24 * 30, // redis过期时间
  prefix: "koa:session:", // redis key前缀
};

const mysqlConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "12345678",
  database: "nodemysql",
  synchronize: true,
  logging: false,
};

const tokenConfig = {
  secret: "hello_jwt_et325325",
};

const clientKey = {
  "dudu-pms": {
    clientKey: "71d81977-33fd-4499-bb46-87a03cf52236",
  },
};

export {
  clientKey, redisConfig, tokenConfig, mysqlConfig
}

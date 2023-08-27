import { mysqlConfig, redisConfig } from "../../config"
import { DataSource } from "typeorm"
const cwd = process.cwd();

const AppDataSource = new DataSource({
    entities: [ cwd +"/entity/*{.js,.ts}"],
    ...mysqlConfig as any
})

import Redis from 'ioredis';
const RedisDataSource = new Redis(redisConfig);

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("datasource created")
    })
    .catch((error) => console.log(error))

export { AppDataSource,  RedisDataSource}
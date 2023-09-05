import { mysqlConfig, redisConfig } from "./config"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    entities: ["./server/entity/*{.js,.ts}"],
    ...mysqlConfig as any
})

const startDataSource = async function() {
    try {
        await AppDataSource.initialize();
        console.log("---------> 生成的实体数量",AppDataSource.entityMetadatas.length)
    } catch(e) {
        console.log(e.message)
    }
}

import Redis from 'ioredis';
const RedisDataSource = new Redis(redisConfig);



export { AppDataSource,  RedisDataSource, startDataSource}
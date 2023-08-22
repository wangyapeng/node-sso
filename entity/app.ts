import { Tenant } from "./tenant";

const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');


// 应用市场中的应用，此为系统基础设置

@Entity()
export class App {
    @Column()
    id: number;

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    avatar: string;

    @Column()
    description: string;
}
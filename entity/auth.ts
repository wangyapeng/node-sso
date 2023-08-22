import { CreateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { App } from "./app";

const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

export enum AppStatusType {
    TrialOrder = 'TrailOrder',
    OfficialOrder = 'OfficialOrder',
}

// 应用鉴权表
@Entity()
export class Auth {
    @Column()
    id: string;

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    userId: string;

    @Column()
    tenantId: string;

    @OneToOne(type => App)
    @JoinColumn()
    app: App

    @Column()
    domainName: string;
    
    @Column()
    bookCode: string;

    @Column()
    productName: string;

    @Column()
    productAppKey: string;

    @Column({
        default: ""
    })
    resource: string;

    @Column({
        type: "datetime"
    })
    authTime: Date;

    @Column({
        type: "datetime"
    })
    failureTime: Date;

    @Column({
        type: "enum",
        enum: AppStatusType,
        default: AppStatusType.TrialOrder
    })
    appStatus: string;

    @Column()
    @CreateDateColumn()
    createdStamp: string;
}
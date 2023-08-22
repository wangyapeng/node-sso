import { CreateDateColumn } from "typeorm";

const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');



export enum TradeStatus{
    PayIng = '支付中',
    PayEd = '已支付',
}

export enum OrderType {
    TrialOrder = 'TrailOrder',
    OfficialOrder = 'OfficialOrder',
}

@Entity()
export class Order {
    @Column()
    id: string;

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    userId: string;

    @Column()
    tenantId: string;

    @Column()
    productName: string;

    @Column()
    productAppKey: string;

    @Column()
    detail: number;

    @Column()
    price: number;

    @Column()
    amount: number;

    @Column({
        type: "enum",
        enum: TradeStatus,
        default: TradeStatus.PayIng
    })
    tradeStatus: string;

    @Column()
    orderSn: string;

    @Column({
        type: "enum",
        enum: OrderType,
        default: OrderType.TrialOrder
    })
    orderType: string;

    @Column()
    @CreateDateColumn()
    createdStamp: string;
}
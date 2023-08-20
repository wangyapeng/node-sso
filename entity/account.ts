import { ManyToOne } from "typeorm";
import { Tenant } from "./tenant";

const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');


@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  edition: number;

  @ManyToOne(type => Tenant, tenant => tenant.accounts)
  tenant: Tenant
}
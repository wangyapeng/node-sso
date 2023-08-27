import { ManyToOne } from "typeorm";
import { Tenant } from "./tenant";

import { Entity, Column, PrimaryGeneratedColumn }  from 'typeorm';


@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  edition: number;

  //@ts-ignore
  //@ts-nocheck
  // @ManyToOne(type => Tenant, tenant => tenant.accounts)
  // tenant: Tenant
}
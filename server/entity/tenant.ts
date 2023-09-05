import { JoinColumn, JoinTable, OneToMany, OneToOne, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./user";

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

   //@ts-ignore
  //@ts-nocheck
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @Column({default: ""})
  corporateLegalPerson: string;

  @Column({default: ""})
  industry: string;

  @Column({default: ''})
  companySize: string;

  @Column({default:''})
  taxPayNumber: string;

  @Column({default: ""})
  telephone: string;

  @OneToMany(type => Account, account => account.tenant)
  accounts: Account[]

  @Column({default: ""})
  address: string;
}


@Entity()
class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  edition: number;

  //@ts-ignore
  //@ts-nocheck
  @ManyToOne(type => Tenant, tenant => tenant.accounts)
  tenant: Tenant
}

export {
  Tenant,
  Account
}
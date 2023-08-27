import { JoinColumn, JoinTable, OneToMany, OneToOne, ManyToMany } from "typeorm";
import { Account } from "./account";
import { User } from "./user";

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Tenant {
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

  // @OneToMany(type => Account, account => account.tenant)
  // accounts: Account[]

  @Column({default: ""})
  address: string;
}
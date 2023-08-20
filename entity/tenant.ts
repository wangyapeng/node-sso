import { JoinColumn, JoinTable, OneToMany, OneToOne, ManyToMany } from "typeorm";
import { Account } from "./account";
import { User } from "./user";

const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');


@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

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
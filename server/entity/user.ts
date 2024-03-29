import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Tenant } from "./tenant";

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum Sex{
  MALE = 'male',
  FEMALE = 'female',
}


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: Sex,
    default: Sex.FEMALE
  })
  sex: string;

  @Column({default: ""})
  address: string;
}
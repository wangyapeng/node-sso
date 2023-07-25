const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');


@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  comments: string;
}
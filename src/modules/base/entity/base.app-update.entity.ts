import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("base_app_update")
export class BaseAppUpdateEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  version: string;


  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  name: string;


  @Column({
    type: "varchar",
    nullable: false
  })
  features: string;


  @Column({
    type: "varchar",
    nullable: false
  })
  changes: string;
}

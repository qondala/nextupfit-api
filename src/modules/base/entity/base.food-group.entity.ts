import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";


@Entity("base_food_group")
export class BaseFoodGroupEntity {

  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({ type: "varchar", nullable: true })
  iconUrl?: string;


  @Column({ type: "int", nullable: false })
  createdByUserId: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
 
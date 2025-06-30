import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";


@Entity("base_sociology_group")
export class BaseSociologyGroupEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: false })
  name: string;


  @Column({ nullable: false })
  description: string;


  @Column({ nullable: false })
  baseSociologyGroupId: number;


  @Column({ nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
 
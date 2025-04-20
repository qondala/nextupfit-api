import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("base_body_param")
export class BaseBodyParamEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({ type: "varchar", nullable: true })
  description?: string;


  @Column({ type: "int", nullable: true })
  unitId?: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}

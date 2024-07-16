import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Content } from "./content.entity";

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.stages)
  content: Content;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  orderIndex: number;
}

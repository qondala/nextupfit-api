import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Content } from "./content.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column({ nullable: true })
  categoryDescription: string;

  @OneToMany(() => Content, (content) => content.category)
  content: Content[];
}

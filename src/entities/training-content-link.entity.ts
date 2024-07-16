import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Session } from "./session.entity";
import { Content } from "./content.entity";

@Entity()
export class TrainingContentLink {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Session, (session) => session.trainingContentLinks)
  session: Session;

  @ManyToOne(() => Content, (content) => content.trainingContentLinks)
  content: Content;
}

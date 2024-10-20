import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Session } from "./session.entity";
import { Content } from "./content.entity";

@Entity()
export class TrainingContentLink {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Session, (session) => session.trainingContentLinks)
  @JoinColumn()
  session: Session;

  @ManyToOne(() => Content, (content) => content.trainingContentLinks)
  @JoinColumn()
  content: Content;
}

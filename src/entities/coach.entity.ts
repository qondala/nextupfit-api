import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";
import { CoachQualification } from "./coach-qualification.entity";
import { CoachSpecialization } from "./coach-specialization.entity";
import { CoachRating } from "./coach-rating.entity";
import { PrivateDiscussion } from "./private-discussion.entity";
import { News } from "./news.entity";
import { Recommendation } from "./recommendation.entity";
import { CoachFollow } from "./coach-follow.entity";
import { NutritionProgram } from "./nutrition-program.entity";
import { Challenge } from "./challenge.entity";
import { Session } from "./session.entity";
import { CoachTransfer } from "./coach-transfer.entity";

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: "float", default: 0.0 })
  ratingAvg: number;

  @Column({ nullable: true })
  stripeAccountId: string;

  @Column({ default: "fitness_trainer" })
  type: "nutritionist" | "fitness_trainer";

  @Column({ nullable: true })
  coverImageUrl: string;

  @OneToOne(() => User, (user) => user.coach, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Content, (content) => content.coach, {
    cascade: true,
  })
  content: Content[];

  @OneToMany(() => CoachQualification, (qualification) => qualification.coach, {
    cascade: true,
  })
  qualifications: CoachQualification[];

  @OneToMany(
    () => CoachSpecialization,
    (specialization) => specialization.coach,
    { cascade: true },
  )
  specializations: CoachSpecialization[];

  @OneToMany(() => CoachRating, (rating) => rating.coach, {
    cascade: true,
  })
  ratings: CoachRating[];

  @OneToMany(() => PrivateDiscussion, (discussion) => discussion.coach, {
    cascade: true,
  })
  privateDiscussions: PrivateDiscussion[];

  @OneToMany(() => News, (news) => news.coach, { cascade: true })
  news: News[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.recommender,
    { cascade: true },
  )
  recommendations: Recommendation[];

  @OneToMany(() => CoachFollow, (coachFollow) => coachFollow.coach, {
    cascade: true,
  })
  coachFollows: CoachFollow[];

  @OneToMany(() => NutritionProgram, (coachFollow) => coachFollow.coach, {
    cascade: true,
  })
  nutritionPrograms: NutritionProgram[];

  @OneToMany(() => Challenge, (challenge) => challenge.coach, {
    cascade: true,
  })
  challenges: Challenge[];

  @OneToMany(() => Session, (session) => session.coach, {
    cascade: true,
  })
  sessions: Session[];

  @OneToMany(() => CoachTransfer, (transfer) => transfer.coach)
  transfers: CoachTransfer[];
}

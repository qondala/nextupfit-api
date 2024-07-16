import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
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

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: "float", default: 0.0 })
  ratingAvg: number;

  @Column({ default: "fitness_trainer" })
  type: "nutritionist" | "fitness_trainer";

  @OneToOne(() => User, (user) => user.coach, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Content, (content) => content.coach)
  content: Content[];

  @OneToMany(() => CoachQualification, (qualification) => qualification.coach)
  qualifications: CoachQualification[];

  @OneToMany(
    () => CoachSpecialization,
    (specialization) => specialization.coach,
  )
  specializations: CoachSpecialization[];

  @OneToMany(() => CoachRating, (rating) => rating.coach)
  ratings: CoachRating[];

  @OneToMany(() => PrivateDiscussion, (discussion) => discussion.coach)
  privateDiscussions: PrivateDiscussion[];

  @OneToMany(() => News, (news) => news.coach)
  news: News[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.recommender,
  )
  recommendations: Recommendation[];

  @OneToMany(() => CoachFollow, (coachFollow) => coachFollow.coach)
  coachFollows: CoachFollow[];

  @OneToMany(() => NutritionProgram, (coachFollow) => coachFollow.coach)
  nutritionPrograms: NutritionProgram[];
}

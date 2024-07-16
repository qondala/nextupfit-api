import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Coach } from "./coach.entity";
import { ContentGoal } from "./content-goal.entity";
import { Category } from "./category.entity";
import { ContentRating } from "./content-rating.entity";
import { ContentReview } from "./content-review.entity";
import { Session } from "./session.entity";
import { AffiliateProgram } from "./affiliate-program.entity";
import { Payment } from "./payment.entity";
import { UserProgram } from "./user-program.entity";
import { TrainingContentLink } from "./training-content-link.entity";
import { Stage } from "./stage.entity";
import { Exercise } from "./exercise.entity";
import { ContentNutrition } from "./content-nutrition.entity";

@Entity()
export class Content {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "float", default: 0 })
  price: number;

  @Column()
  isPaid: boolean;

  /*@Column()
  type: "challenge" | "program" | "session";*/

  @Column({ nullable: true })
  recipeCount: number;
  @Column({ nullable: true })
  caloriesToBurn: number;
  @Column({ nullable: true })
  mealType: "breakfast" | "lunch" | "dinner";
  @Column({ nullable: true })
  isBookmarked: boolean;
  @Column({ type: "json", nullable: true })
  tags: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  goalSpecifics: string;

  @Column({ type: "float", default: 0.0 })
  averageRating: number;

  @Column({ default: 0 })
  numberOfRatings: number;

  @Column({ nullable: true })
  contentType: string;

  @ManyToOne(() => Coach, (coach) => coach.content)
  coach: Coach;

  @ManyToOne(() => Category, (category) => category.content)
  category: Category;

  @OneToMany(() => ContentGoal, (contentGoal) => contentGoal.content)
  goals: ContentGoal[];

  @OneToMany(() => ContentRating, (contentRating) => contentRating.content)
  ratings: ContentRating[];

  @OneToMany(() => ContentReview, (contentReview) => contentReview.content)
  reviews: ContentReview[];

  @OneToMany(() => Session, (session) => session.content)
  sessions: Session[];

  @OneToMany(
    () => AffiliateProgram,
    (affiliateProgram) => affiliateProgram.content,
  )
  affiliatePrograms: AffiliateProgram[];

  @OneToMany(() => Payment, (payment) => payment.content)
  payments: Payment[];

  @OneToMany(() => UserProgram, (userProgram) => userProgram.content)
  userPrograms: UserProgram[];

  @OneToMany(
    () => TrainingContentLink,
    (trainingContentLink) => trainingContentLink.content,
  )
  trainingContentLinks: TrainingContentLink[];

  @OneToMany(() => Stage, (stage) => stage.content)
  stages: Stage[];

  @OneToMany(() => Exercise, (exercise) => exercise.content)
  exercises: Exercise[];

  @OneToMany(
    () => ContentNutrition,
    (contentNutrition) => contentNutrition.content,
  )
  contentNutrition: ContentNutrition[];
}

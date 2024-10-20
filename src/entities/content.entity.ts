import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { Coach } from "./coach.entity";
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
import { FitnessGoal } from "./fitness-goal.entity";
import { NutritionProgram } from "./nutrition-program.entity";
import { News } from "./news.entity";

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

  @Column({ nullable: true })
  isBookmarked: boolean;
  @Column({ type: "json", nullable: true })
  tags: string;

  @Column({ nullable: true })
  imageUrl: string;

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

  @Column({
    type: "enum",
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  })
  status: "unpublished" | "pending" | "approved" | "rejected";

  @Column({ nullable: true })
  statusReason: string;

  @ManyToOne(() => Coach, (coach) => coach.content)
  @JoinColumn()
  coach: Coach;

  @ManyToOne(() => Category, (category) => category.content, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  category: Category;

  @ManyToMany(() => FitnessGoal, (fitnessGoal) => fitnessGoal.contents, {})
  @JoinTable()
  goals: FitnessGoal[];

  @OneToMany(() => ContentRating, (contentRating) => contentRating.content, {
    eager: true,
    cascade: true,
  })
  ratings: ContentRating[];

  @OneToMany(() => ContentReview, (contentReview) => contentReview.content, {
    eager: true,
    cascade: true,
  })
  reviews: ContentReview[];

  @OneToMany(() => Session, (session) => session.content, {
    cascade: true,
  })
  sessions: Session[];

  @OneToOne(() => News, (news) => news.content)
  news: News;

  @OneToMany(
    () => AffiliateProgram,
    (affiliateProgram) => affiliateProgram.content,
  )
  affiliatePrograms: AffiliateProgram[];

  @ManyToMany(() => Payment, (payment) => payment.contents)
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

  @ManyToMany(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.contents,
  )
  nutritionPrograms: NutritionProgram[];
}

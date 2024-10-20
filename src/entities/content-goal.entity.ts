// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   JoinTable,
//   JoinColumn,
// } from "typeorm";
// import { Content } from "./content.entity";
// import { FitnessGoal } from "./fitness-goal.entity";

// @Entity()
// export class ContentGoal {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Content, (content) => content.goals)
//   @JoinColumn()
//   content: Content;

//   @ManyToOne(() => FitnessGoal, (goal) => goal.co)
//   @JoinColumn()
//   goal: FitnessGoal;
// }

// import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
// import { Content } from "./content.entity";
// import { NutritionProgram } from "./nutrition-program.entity";

// @Entity()
// export class ContentNutrition {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Content, (content) => content.contentNutrition)
//   content: Content;

//   @ManyToOne(
//     () => NutritionProgram,
//     (nutritionProgram) => nutritionProgram.contentNutrition,
//   )
//   nutritionProgram: NutritionProgram;
// }

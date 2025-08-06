import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  BaseNutritionEntity,
  BaseProgramGoalEntity,
  BaseSociologyEntity,
  BaseWorkoutEntity,
} from "@app/module/base/entity";

import { UserEntity, UserInterestEntity } from "@app/module/user/entity";

import { GymManagerEntity } from "@app/module/gym/entity";

import { UserInterestService } from "@app/module/user/service";

import {
  ProgramEntity,
  ProgramPerSociologyEntity,
  ProgramStepActivityEntity,
  ProgramStepActivityWorkingsessionEntity,
  ProgramStepActivityWorkingsessionWorkoutEntity,
  ProgramStepActivityWorkingsessionNutritionEntity,
  ProgramStepActivityWorkingsessionPracticeEntity,
  ProgramStepEntity,
  ProgramSubscriptionPlanEntity,
  ProgramWorkoutNutrientBurnEntity,
  ProgramManagerEntity,
  ProgramFreetoolInterestEntity,
  ProgramFreetoolEntity,
  ProgramInterestEntity,
  ProgramSubscriptionEntity,
} from "./entity";

import {
  ProgramController,
  ProgramFreetoolController,
  ProgramFreetoolInterestController,
  ProgramInterestController,
  ProgramManagerController,
  ProgramPerSociologyController,
  ProgramStepActivityController,
  ProgramStepActivityWorkingsessionController,
  ProgramStepActivityWorkingsessionWorkoutController,
  ProgramStepActivityWorkingsessionNutritionController,
  ProgramStepActivityWorkingsessionPracticeController,
  ProgramStepController,
  ProgramSubscriptionController,
  ProgramSubscriptionPlanController,
  ProgramWorkoutNutrientBurnController,
} from "./controller";

import {
  ProgramFreetoolInterestService,
  ProgramFreetoolService,
  ProgramInterestService,
  ProgramManagerService,
  ProgramPerSociologyService,
  ProgramService,
  ProgramStepActivityService,
  ProgramStepActivityWorkingsessionService,
  ProgramStepActivityWorkingsessionWorkoutService,
  ProgramStepActivityWorkingsessionNutritionService,
  ProgramStepActivityWorkingsessionPracticeService,
  ProgramStepService,
  ProgramSubscriptionPlanService,
  ProgramSubscriptionService,
  ProgramWorkoutNutrientBurnService,
} from "./service";

/**
 * The Program Module is the core engine of the NPF Fitness Platform, responsible for structuring every user’s fitness journey in a clear, progressive, and measurable way.
 *
 * Unlike most fitness or coaching platforms that are session-based, where users simply purchase isolated sessions or classes just like e-commerce products, NPF is program-based.
 * Which means that NPF trainers and coaches organize their training content in milestones called program nodes: steps (phases), activities, workingsessions and workouts.
 * On the user side, users consume programs in a sequential way, following gradually the program hierarchy.
 * This program-first approach ensures that users follow a well-structured plan that leads to long-term results, instead of engaging in random, unconnected sessions.
 *
 * 1. Program Hierarchy Structure
 *
 * The NPF platform organizes training content in a five-level hierarchy, providing clarity and progression for both users and trainers/coaches (a.k.a program managers):
 *
 *  └── Program
 *        A complete fitness/coaching journey designed around a specific goal 
 *        e.g: "12-Week Muscle Gain", "The Best Weight Management Blueprint".
 *        Defines the overall structure, duration, and objectives, 
 *        and is the root node of the hierarchy.
 *
 *     └── Steps (Program phases)
 *         Each program is divided into phases, representing training cycles or milestones
 *         e.g: Foundation → Strength → Peak Performance.
 *         Phases allow progressive overload and goal segmentation.
 *
 *         └── Activities
 *             Specific fitness activities within a phase, targeting a type of training or body focus
 *             e.g: Upper Body Strength, HIIT Cardio, Yoga Recovery.
 *             Activities make the program diverse and engaging, while maintaining structure.
 *
 *             └── Working Sessions
 *                 Scheduled practice blocks for each activity.
 *                 A working session defines what the user does on a given day, including rest periods and workout duration.
 *
 *                 └── practices
 *                     The actionable exercise sequence within a working session.
 *                     Includes sets, reps, instructions, and demonstration videos.
 *                                   |         |
 *                     nutritions  ──┘         └── workouts (sport, dance)

 *
 * 2- Programs's Access Rights
 * Program access is determined by two types of access rights.
 * These access rights ensure that users can only access the programs (and program nodes) they are authorized to access.
 * Program navigation itself is handled ith the Navigation module.
 * 
 * These two types of access rights are configured at two levels:
 
 * 2.1- Visibility: This is the first and most basic type of access right.
 * A user must not be able to view a program which is configured by program owner (gym admin or trainer) for an audience which the user does not belong.
 * For instance, there are programs that are configured to be visible to all NPF platform users (visibility: public).
 * Other programs are configured to be visible to only some users: gym members, trainers followers.
 * Visibility settings are configured by program owner.
 * Visibility settings are stored in the following nodes:
 * - Program (see visibility attribute in @app/module/program/entity/program.entity.ts)
 * - Activity (see visibility attribute in @app/module/program/entity/program.activity.entity.ts)
 * All sub nodes: program steps, activity workingsessions, workouts, workouts inherit visibility settings from their parent node.
 * For this reason, visibility settings is configured exclusively at the program and activity levels.
 * 
 * 2.2- Followership: Another important aspect of visibility is the gym/trainer followership with the user.
 * Some nodes are only visible to the user if he is a follower of the gym/trainer.
 * This is also configured at the program and activity levels on the visibility attribute.
 * Followership services are implemented in the Gym Module (Gym Followers and Gym Manager Followers)
 * 
 * 2.3- Accessibility: The third type of access right is the program accessibility.
 * A program attendee must not be able to consume a program content which is configured by program owner for a specific group of subscribers.
 * For instance, there are programs that are configured to be accessible to all users.
 * Other programs are configured to be accessible to only some users: gym members, trainers followers.
 * Visibility settings are configured by program owner (gym admin or trainer).
 * Visibility settings are stored in the following nodes:
 * - Program (see accessibility attribute in @app/module/program/entity/program.entity.ts)
 * - Activity (see accessibility attribute in @app/module/program/entity/program.activity.entity.ts)
 * All sub nodes: program steps, activity workingsessions, workouts, workouts inherit accessibility settings from their parent node.
 * For this reason, accessibility settings is configured exclusively at the program and activity levels.
 * 
 * Programs accessibility relies on two subscription models:
 * - Gym members subscription model
 * - Program-based subscription model
 * 
 * 
 * 3- Programs subscription models:
 * Users can consume programs following two subscription models.
 * Each subscription model define one or more subscription plans.
 * 
 * 3.1- Gym members subscription model: 
 *   In this model, users are allowed to subscribe according to their membership status.
 *   Membership status is determine by the membership plan a user subscribed to.
 *   A user can subscribe to multiple membership plans in the same gym.
 *   By default, all gym members are allowed to access all programs available in the gym.
 *   However, gyms can still restrict a program access to some membership plans subscribers.
 *   This subscription model is defined by the gym owner at the creation/edition of the program.
 *
 * 
 * 3.2- Program-based subscription model: 
 *   In this model, users subscribe directly to a program that they are interested in.
 *   A program can allow none or several subscription plans.
 *   If a program defines no subscription plan, we rely on its gym membership subscription model, otherwise we consider that the program is publicly accessible.
 *   When a program defines subscription plans, all users that subscribed to any of these subscription plans are allowed to access the program.
 *   However, program owners (gym admins or trainers/coaches - a.k.a program managers) can still restrict access of activities to specific subscription plans users.
 *   This subscription model is defined by the program owner (gym admin or trainer/coach - a.k.a program manager) at the creation/edition of the program.
 *   
 * Program visibility and accessibility check is performed by the program access requirements checker service  in the Navigation Module.
 *
 * SUMMARY: A program is a hierarchy of nodes where each node has a parent and children following this pattern:
 * 
 * └── Program
 * 
 *    └── Program's Steps
 *        |
 *        └── Program Step's Activities
 *            |
 *            └── Program Step Activity's Working Sessions
 *                |
 *                └── Program Step Activity Working Session's Practices
 * 
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      ProgramStepEntity,
      ProgramStepActivityEntity,
      ProgramSubscriptionPlanEntity,
      ProgramWorkoutNutrientBurnEntity,
      ProgramStepActivityWorkingsessionEntity,
      ProgramStepActivityWorkingsessionWorkoutEntity,
      ProgramStepActivityWorkingsessionNutritionEntity,
      ProgramStepActivityWorkingsessionPracticeEntity,
      ProgramPerSociologyEntity,
      ProgramManagerEntity,
      ProgramFreetoolEntity,
      ProgramInterestEntity,
      ProgramFreetoolInterestEntity,
      ProgramSubscriptionEntity,

      // External modules
      BaseSociologyEntity,
      GymManagerEntity,
      BaseNutritionEntity,
      BaseProgramGoalEntity,
      BaseSociologyEntity,
      BaseWorkoutEntity,
      UserEntity,
      UserInterestEntity,
    ]),
  ],
  controllers: [
    ProgramController,
    ProgramStepController,
    ProgramStepActivityController,
    ProgramSubscriptionPlanController,
    ProgramWorkoutNutrientBurnController,
    ProgramStepActivityWorkingsessionController,
    ProgramStepActivityWorkingsessionWorkoutController,
    ProgramStepActivityWorkingsessionNutritionController,
    ProgramStepActivityWorkingsessionPracticeController,
    ProgramPerSociologyController,
    ProgramManagerController,
    ProgramFreetoolController,
    ProgramInterestController,
    ProgramFreetoolInterestController,
    ProgramSubscriptionController,
  ],
  providers: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService,
    ProgramStepActivityWorkingsessionService,
    ProgramStepActivityWorkingsessionWorkoutService,
    ProgramStepActivityWorkingsessionNutritionService,
    ProgramStepActivityWorkingsessionPracticeService,
    ProgramPerSociologyService,
    ProgramManagerService,
    ProgramFreetoolService,
    ProgramInterestService,
    ProgramFreetoolInterestService,
    UserInterestService,
    ProgramSubscriptionService,
  ],
  exports: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService,
    ProgramStepActivityWorkingsessionService,
    ProgramStepActivityWorkingsessionWorkoutService,
    ProgramStepActivityWorkingsessionNutritionService,
    ProgramStepActivityWorkingsessionPracticeService,
    ProgramPerSociologyService,
    ProgramManagerService,
    ProgramFreetoolService,
    ProgramInterestService,
    ProgramFreetoolInterestService,
    UserInterestService,
    ProgramSubscriptionService,
  ],
})
export class ProgramModule {}

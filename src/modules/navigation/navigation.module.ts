import { Module } from "@nestjs/common";
import { ProgramModule } from "@app/module/program/program.module";
import { GymModule } from "@app/module/gym/gym.module";
import { UserModule } from "@app/module/user/user.module";
import { PaymentModule } from "@app/module/payment/payment.module";

import {
  // User program access
  UserGymAccessStatusController,
  UserProgramAccessStatusController,

  // Program navigator
  NavigatorProgramController,
  NavigatorProgramStepController,
  NavigatorProgramStepActivityController,
  NavigatorProgramStepActivityWorkingsessionController,
  NavigatorProgramStepActivityWorkingsessionWorkoutController,

  // Navigation
  NavigationFromProgramController,
  NavigationFromProgramStepController,
  NavigationFromProgramStepActivityController,
  NavigationFromProgramStepActivityWorkingsessionController,
  NavigationFromProgramStepActivityWorkingsessionWorkoutController,
} from "./controller";

import {
  // User program access
  UserGymAccessStatusService,
  UserProgramAccessStatusService,

  // Program navigator
  NavigatorProgramService,
  NavigatorProgramStepService,
  NavigatorProgramStepActivityService,
  NavigatorProgramStepActivityWorkingsessionService,
  NavigatorProgramStepActivityWorkingsessionWorkoutService,

  // Navigation
  NavigationFromProgramService,
  NavigationFromProgramStepService,
  NavigationFromProgramStepActivityService,
  NavigationFromProgramStepActivityWorkingsessionService,
  NavigationFromProgramStepActivityWorkingsessionWorkoutService,
} from "./service";

import {
  ActivityAccessRequirementsCheckerService,
  ProgramAccessRequirementsCheckerService,
} from "./service/access-requirements-checker";

import {
  BrowserPreviousFromStepService,
  BrowserPreviousFromStepActivityService,
  BrowserPreviousFromStepActivityWorkingsessionService,
  BrowserPreviousFromStepActivityWorkingsessionWorkoutService,
} from "./service/previous-browser";

/**
 * This module provides a set of features that enable users to navigate forward and backward 
 * through the program hierarchy, while respecting access permissions defined by program owners 
 * and considering the user’s current progress within the program trail.
 * 
 * In alignment with NPF’s program-based business model, program trails are structured as a hierarchy of interconnected nodes.
 * Program nodes are: program entry, steps, activities, workouts, workingsessions and workouts structured as follows:
 * 
 * └──> Program (root node, program entry)
 *    └──> Program's Steps (second level)
 *        └──> Program Step's Activities (third level)
 *            └──> Program Step Activity's Working Sessions (fourth level)
 *                └──> Program Step Activity Working Session's Workout (fifth level)
 * 
 * 
 * It is business critical for this module to ensure that 
 * users can only navigate to the program nodes they are authorized to access.
 * 
 * 
 * A. SPECIFICATIONS
 * We identified two major challenging aspects while implementing navigation through the program trail:
 * 
 * A.1- Access rights check
 * Access right is checked using the following rules:
 * 
 * A.1.1- Node visibility and accessibility:
 * Visibility and accessibility of a program node are configured at the program and/or activity levels.
 * and are used to determine whether a node is visible and accessible to the user.
 * NB: All sub nodes of a node inherit visibility and accessibility settings of their parent node.
 * Activity nodes can override program's visibility and accessibility settings.
 * Learn more in the Program Module documentation.
 * 
 * A.1.2- Gym/trainer followership with the user:
 * Some nodes are only visible to the user if they are follower of the gym/trainer.
 * Learn more in the Program and Gym Modules documentation.
 * 
 * A.1.3 - User progress in the program trail:
 * User progress in the program trail is recorded in the User Module, more precisely in the UserProgramEvolutionService.
 * User progress in the program trail is checked using the following rules:
 * - When a user navigates to a program node, we check if his current progress in the program trail is enough to navigate to the node.
 * - If it is not, the navigation endpoint returns a "canNavigate: false" Navigation node object response (see ProgramNavigationNode in dto/nagigation/program-navigation-node.ts).
 
 *
 * 2- Navigation process itself
 * 
 * The navigation process unfolds as follows:
 * Access right check -> Progress check -> Navigation
 * Navigation consists in determining the next and previous nodes, given the current node.
 * 
 * - The next or previous node to navigate is not necessarily the next or previous node in the program trail.
 * A node can especially be skipped due to access rights on it.
 * For instance, program owner can define that an activity is restricted to some gym membership plans or program subscription plans.
 * In this case, the navigation process will skip that activity node and navigate to the next node and perform the same access right checks recursively.
 * 
 * - We plan to implement other smart conditions to navigate through program trails in the next release, that will be helpful for complex coaching/training programs.
 * That release will come up with exercises, questionnaires, quizzes, smart contents and other interactive elements. 
 * That's why we implemented the program trail navigation to be flexible enough.
 * 
 * 
 * B. IMPLEMENTATION
 * 
 * This module defines three critical business components:
 * 
 * 
 * B.1- Navigation Component
 * 
 * Navigation starts when user enters a program trail screen, via the mobile app, or when  a user tries to access a specific program item directly from his timeline, 
 * or gym page, or trainer page, notifications, or any other screen.
 * The navigation should be able to caculate access rights of the user on the requested item, it milestone position percentage int the program trail.
 * 
 * To achieve that, this component defines nodes controllers (see: ./controller/navigation) and services (see: ./service/navigation).
 * Controllers of this component expose to the mobile app (or any future clients) an endpoint per node type,
 * which call a method $controller.navigate( parameters: @ProgramNodeNavigationParams ): and return a @UserProgramNavigation object which contains three entries:
 * - {currentNode}: @ProgramNavigationNode
 * - {previousNode}: @ProgramNavigationNode
 * - {nextNode}: @ProgramNavigationNode
 * 
 * Controller parameters: @ProgramNodeNavigationParams provide two entries:
 * - {id}: @number the id of the node to navigate to (program id, step id, activity id, workout id, workingsession id, or workout id in respect of the type of controller)
 * - {userId}: @number the id of the user requesting the navigation
 * 
 * The Navigation Component calculates the {currentNode}, and then calls the Program Navigator component to calculate the {previousNode}, and {nextNode} of a node.
 * Calculate a navigation node means checking the navigability of the node: visibility, accessibility, followership and node milestone percentage.
 * 
 * A navigation node is a @ProgramNavigationNode object.
 * It has following important properties:
 * - {programItemType}: @ProgramItemTypeEnum
 * - {programItemId}: @number
 * - {userId}: @number
 * - {title}: @string
 * - {description}: @string
 * - {icon}: @string
 * - {canNavigate}: @boolean
 * - {reasonCannotNavigate}: @ProgramNavigationReasonEnum
 * - {milestonePercentage}: @number
 * 
 * Property {canNavigate} indicates if the node can be navigated to by the user reauesting to access it.
 * Property {reasonCannotNavigate} of type @ProgramNavigationReasonEnum eventually indicates the reason why the node cannot be navigated to.
 * It helps the mobile app to display a message to the user explaining why the node cannot be navigated to, or take other actions, like for instance
 * proposing user to upgrade his subscription plan or gym membership plan, or to follow the gym/trainer, complete some questionnaires, etc.
 * Property {milestonePercentage} helps the mobile app to display a marker on the trail progress bar, representing the position of the node in the program trail.
 * 
 * At the UI level, navigation happens via two buttons (back and next) located at the bottom of program trail screen:
 * - The back navigation button is active if {canNavigate} property of {previousNode} is true, and as a disabled button if {canNavigate} is false.
 * - The next navigation button is displayed as a button if {canNavigate} property of {nextNode} is true, and as a disabled button if {canNavigate} is false.
 * Once in the program trail navigation screen, the navigation forward or backward is a done by calling the Program Navigator component.
 * 
 * 
 * B.2- Program Navigator Component (PNC)
 * This component is a critical component for this module, for the reason that it is the place where the navigation through the program trail is implemented.
 * It allows the user to navigate forward and backward in the program trail.
 * Every PNC service implements two methods: 
 * - $service.next( current: @ProgramNavigationNode ): Promise< @ProgramNavigationNode > for determining the next node to navigate to.
 * - $service.previous( current: @ProgramNavigationNode ): Promise< @ProgramNavigationNode > for determining the previous node to navigate to.
 * 
 * The next() method first proceed with navigability checks before browsing down the program trail hierarchy to determine the next node to navigate to.
 * The previous() method doesn't perform accessibility checks, but browse up the program trail hierarchy to determine the previously started or completed node, and return the smallest node unit possible.
 * It skips accessibility checks because it assumes that the user was able to navigate to navigate those started or completed nodes before.
 * 
 * Next() method of the PNC unfolds as follows:
 * 
 * └──> Program (root node)
 *    |
 *    | Visibility check -> Accessibility check -> Progress tracking
 *    | If program node passes all navigability checks, return the program node
 *    | Else, pick the first step node of program trail.
 *    | If no step node found, return canNavigate = false 
 *    | and reasonCannotNavigate = @ProgramNavigationReasonEnum.programHasNoStep
 *    |
 *    └──> Program's Steps (step node)
 *        |
 *        | Visibility check -> Accessibility check -> Progress tracking
 *        | If step node passes all navigability checks, return the step node
 *        | Else, pick the first activity node of step trail.
 *        | If no activity node found, return canNavigate = false 
 *        | and reasonCannotNavigate = @ProgramNavigationReasonEnum.stepHasNoActivity
 *        |
 *        └──> Program Step's Activities (activity node)
 *            |
 *            | Visibility check -> Accessibility check -> Progress tracking
 *            | If activity node passes all navigability checks, return the activity node
 *            | Else, pick the first working session node of activity trail.
 *            | If no working session node found, return canNavigate = false 
 *            | and reasonCannotNavigate = @ProgramNavigationReasonEnum.activityHasNoWorkingSession
 *            |
 *            └──> Program Step Activity's Working Sessions (session node)
 *                |
 *                | Visibility check -> Accessibility check -> Progress tracking
 *                | If working session node passes all navigability checks, return the working session node
 *                | Else, pick the first workout node of working session trail.
 *                | If no workout node found, return canNavigate = false 
 *                | and reasonCannotNavigate = @ProgramNavigationReasonEnum.workingSessionHasNoWorkout
 *                |
 *                └──> Program Step Activity Working Session's Workout (workout node)
 *                    |
 *                    | Visibility check -> Accessibility check -> Progress tracking
 *                    | If workout node passes all navigability checks, return the workout node
 *                    | Else, return canNavigate = false 
 *                    | and reasonCannotNavigate = @ProgramNavigationReasonEnum.programEnd
 * 
 * 
 * Previous() method of the PNC unfolds as follows (read from bottom to top):
 *
 *
 *                ┌─> Program Step's Activities (program node)
 *                | 
 *                | 1. If user user ever started of completed the program, return the program node
 *                | 2. Else, no previous node found
 *                |
 *            ┌─> Program's Step (step node)
 *            | 
 *            | 1. If user user ever started of completed the program step, return the step node
 *            | 2. Else, loop through the previous steps of the program trail, from last to first
 *            | until finding the first step that the user has started or completed
 *            | 3. If no step is found, climb up to the program node
 *            | 
 *        ┌─> Program Step Activity (activity node)
 *        |
 *        | 1. If user user ever started or completed the activity, return the activity node
 *        | 2. Else, loop through the previous activities of the step, from last to first
 *        | until finding the very first activity that the user has started or completed, and return the activity node
 *        | 3. If no activity is found, climb up to the step node
 *        |
 *      ┌─> Program Step Activity's Working Session (session node)
 *      | 
 *      | 1. If user user ever started or completed the working session, return the session node
 *      | 2. Else, loop through the previous working sessions of the activity, from last to first
 *      | until finding the very first session that the user has started or completed, and return the session node
 *      | 3. If no session is found, climb up to the activity node
 *      | 
 *  ┌─> Program Step Activity Working Session's Workout (workout node)
 *  | 
 *  | 1. Loop through the previous workouts of the working session, from last to first
 *  | until finding the very first workout that the user has started or completed, and return the workout node
 *  | 2. If no workout is found, climb up to the working session node
 * 
 *  Backward browsing is handled in the [previous-browser] service.
 *  See in @app/module/navigation/service/previous-browser.
 * 
 * B.3- Access Requirements Checker (ARC)
 * 
 * This component is a critical component for this module.
 * 
 * └──> 1. ARC collects access requirements of the program node
 *      This is done by extracting visibility and accessibility attributes of the program item entity.
 * 
 * └──> 2. ARC uses its [user access status] service to collect (and only collect) user status in the gym, program and manager.
 *      Access status is defined at three levels:
 *      - gym level (membership and followership),
 *      - program level (subscription)
 *      - manager level (followership)
 *      The [user access status] also checks that user gym membership and program subscriptions are active.
 *      Which means that the user has paid the gym membership and the subscription within the due date.
 * 
 * └──> 3. ARC uses its [access resolver] utility to match collected user access status with access requirements of the program node
 *      and decide if user satisfies the access requirements and returns a @ProgramAccessDecision object (defined in module types).
 *      This object has two properties:
 *      - {ok}: @boolean indicating if user satisfies the access requirements
 *      - {reason}: @ProgramNavigationReasonEnum indicating the reason why the user does not satisfies the access requirements
 * 
 * └──> 4. ARC returns the @ProgramAccessDecision object to the Navigation Components which use it to calculate the navigation node states ( {canNavigate}, {reasonCannotNavigate}).
 * 
 */
@Module({
  imports: [ProgramModule, GymModule, UserModule, PaymentModule],
  controllers: [
    UserGymAccessStatusController,
    UserProgramAccessStatusController,

    NavigatorProgramController,
    NavigatorProgramStepController,
    NavigatorProgramStepActivityController,
    NavigatorProgramStepActivityWorkingsessionController,
    NavigatorProgramStepActivityWorkingsessionWorkoutController,

    NavigationFromProgramController,
    NavigationFromProgramStepController,
    NavigationFromProgramStepActivityController,
    NavigationFromProgramStepActivityWorkingsessionController,
    NavigationFromProgramStepActivityWorkingsessionWorkoutController,
  ],
  providers: [
    UserGymAccessStatusService,
    UserProgramAccessStatusService,

    NavigatorProgramService,
    NavigatorProgramStepService,
    NavigatorProgramStepActivityService,
    NavigatorProgramStepActivityWorkingsessionService,
    NavigatorProgramStepActivityWorkingsessionWorkoutService,

    NavigationFromProgramService,
    NavigationFromProgramStepService,
    NavigationFromProgramStepActivityService,
    NavigationFromProgramStepActivityWorkingsessionService,
    NavigationFromProgramStepActivityWorkingsessionWorkoutService,

    // Access requirements checker
    ProgramAccessRequirementsCheckerService,
    ActivityAccessRequirementsCheckerService,

    // Previous browser services
    BrowserPreviousFromStepService,
    BrowserPreviousFromStepActivityService,
    BrowserPreviousFromStepActivityWorkingsessionService,
    BrowserPreviousFromStepActivityWorkingsessionWorkoutService,
  ],
  exports: [
    UserGymAccessStatusService,
    UserProgramAccessStatusService,

    NavigatorProgramService,
    NavigatorProgramStepService,
    NavigatorProgramStepActivityService,
    NavigatorProgramStepActivityWorkingsessionService,
    NavigatorProgramStepActivityWorkingsessionWorkoutService,

    NavigationFromProgramService,
    NavigationFromProgramStepService,
    NavigationFromProgramStepActivityService,
    NavigationFromProgramStepActivityWorkingsessionService,
    NavigationFromProgramStepActivityWorkingsessionWorkoutService,

    // Access requirements checker
    ProgramAccessRequirementsCheckerService,
    ActivityAccessRequirementsCheckerService,

    // Previous browser services
    BrowserPreviousFromStepService,
    BrowserPreviousFromStepActivityService,
    BrowserPreviousFromStepActivityWorkingsessionService,
    BrowserPreviousFromStepActivityWorkingsessionWorkoutService,
  ],
})
export class NavigationModule {}

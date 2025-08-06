export enum ProgramNavigationReasonEnum {
  /*
   * Cannot navigate reasons
   */

  // Non existing resources
  resourceDoesNotExist = "resourceDoesNotExist",
  programHasNoStep = "programHasNoStep",
  programHasNoStepActivity = "programHasNoStepActivity",
  programHasNoStepActivityWorkingsession = "programHasNoStepActivityWorkingsession",
  programHasNoStepActivityWorkingsessionWorkout = "programHasNoStepActivityWorkingsessionWorkout",
  noPreviousProgramItemStartedOrCompletedFound = "noPreviousProgramItemStartedOrCompletedFound",

  // Program progress reasons
  programHome = "programHome",
  programEnd = "programEnd",
  programNotYetStarted = "programNotYetStarted",
  programStepNotYetStarted = "programStepNotYetStarted",
  programStepActivityNotYetStarted = "programStepActivityNotYetStarted",
  workingsessionNotYetStarted = "workingsessionNotYetStarted",
  workoutNotYetStarted = "workoutNotYetStarted",

  // Gym level access reasons
  isNotFollowingGym = "isNotFollowingGym",
  isNotGymMember = "isNotGymMember",
  hasNotPaidGymMembershipPlan = "hasNotPaidGymMembershipPlan",
  gymMembershipPlanTrialEnded = "gymMembershipPlanTrialEnded",

  // Program level access reasons
  isNotProgramSubscriber = "isNotProgramSubscriber",
  hasNotPaidProgramSubscriptionPlan = "hasNotPaidProgramSubscriptionPlan",
  hasNotPaidProgramSubscriptionTrial = "hasNotPaidProgramSubscriptionTrial",
  programSubscriptionPlanTrialEnded = "programSubscriptionPlanTrialEnded",
  isNotManagerFollower = "isNotManagerFollower",

  /*
   * Can navigate reasons
   */

  // Gym level access reasons
  isFollowingGym = "isFollowingGym",
  isGymMember = "isGymMember",
  isGymMemberAndFollower = "isGymMemberAndFollower",
  hasPaidGymMembershipPlan = "hasPaidGymMembershipPlan",
  isOnGymMembershipPlanTrial = "isOnGymMembershipPlanTrial",

  // Program level access reasons
  isProgramSubscriber = "isProgramSubscriber",
  hasPaidProgramSubscriptionPlan = "hasPaidProgramSubscriptionPlan",
  isOnProgramSubscriptionPlanTrial = "isOnProgramSubscriptionPlanTrial",
  programIsPublic = "programIsPublic",
  isManagerFollower = "isManagerFollower",
}

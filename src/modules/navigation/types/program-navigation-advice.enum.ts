export enum ProgramNavigationAdviceEnum {
  // Cannot navigate reasons
  isNotFollowingGym = "isNotFollowingGym",
  isNotGymMember = "isNotGymMember",
  isNotProgramSubscriber = "isNotProgramSubscriber",
  hasNotPaidProgramSubscription = "hasNotPaidProgramSubscription",

  // Can navigate reasons
  isFollowingGym = "isFollowingGym",
  isGymMember = "isGymMember",
  isProgramSubscriber = "isProgramSubscriber",
  hasPaidProgramSubscription = "hasPaidProgramSubscription",
  programIsPublic = "programIsPublic",
}

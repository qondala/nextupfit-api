import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { getRepositoryToken } from "@nestjs/typeorm";
import { CoachFollow } from "../../entities/coach-follow.entity";
import { Coach } from "../../entities/coach.entity";
import { User } from "../../entities/user.entity";
import { UsersService } from "../../modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (CoachFollows)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let coachFollowRepository: Repository<CoachFollow>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, CoachFollow])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    coachFollowRepository = module.get(getRepositoryToken(CoachFollow));
  });

  describe("findOne", () => {
    it("should return a user with coach follows", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const coach = await coachRepository.save({
        user: user,
        bio: "Coach bio",
        ratingAvg: 4.5,
      });
      const coachFollow = await coachFollowRepository.save({
        user: user,
        coach: coach,
        followDate: new Date(),
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.coachFollows).toEqual(
        expect.arrayContaining([coachFollow]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "coachFollows"],
      });
    });
  });
});

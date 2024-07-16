import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "../../entities/coach.entity";
import { Recommendation } from "../../entities/recommendation.entity";
import { User } from "../../entities/user.entity";
import { UsersService } from "../../modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (Recommendations)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let recommendationRepository: Repository<Recommendation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, Recommendation])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    recommendationRepository = module.get(getRepositoryToken(Recommendation));
  });

  describe("findOne", () => {
    it("should return a user with recommendations", async () => {
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
      const recommendation = await recommendationRepository.save({
        recommender: user,
        recommendedCoach: coach,
        recommendedToUser: user,
        recommendationDate: new Date(),
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.recommendations).toEqual(
        expect.arrayContaining([recommendation]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "recommendations"],
      });
    });
  });
});

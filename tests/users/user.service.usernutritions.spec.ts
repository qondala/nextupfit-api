import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "src/entities/coach.entity";
import { UserNutrition } from "src/entities/user-nutrition.entity";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (UserNutrition)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let userNutritionRepository: Repository<UserNutrition>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, UserNutrition])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    userNutritionRepository = module.get(getRepositoryToken(UserNutrition));
  });

  describe("findOne", () => {
    it("should return a user with user nutrition", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const userNutrition = await userNutritionRepository.save({
        user: user,
        nutritionProgram: { id: 1 },
        startDate: new Date(),
        adherencePercentage: 80,
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.userNutrition).toEqual(
        expect.arrayContaining([userNutrition]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "userNutrition"],
      });
    });
  });
});

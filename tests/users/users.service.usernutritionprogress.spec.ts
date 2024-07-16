import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "src/entities/coach.entity";
import { UserNutritionProgress } from "src/entities/user-nutrition-progress.entity";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (UserNutritionProgress)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let userNutritionProgressRepository: Repository<UserNutritionProgress>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, UserNutritionProgress])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    userNutritionProgressRepository = module.get(
      getRepositoryToken(UserNutritionProgress),
    );
  });

  describe("findOne", () => {
    it("should return a user with user nutrition progress", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const userNutritionProgress = await userNutritionProgressRepository.save({
        user: user,
        nutritionProgram: { id: 1 },
        dateLogged: new Date(),
        mealsConsumed: JSON.stringify([]),
        caloriesIntake: 2000,
        proteinIntake: 100,
        carbsIntake: 200,
        fatsIntake: 50,
        adherenceScore: 80,
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.userNutritionProgress).toEqual(
        expect.arrayContaining([userNutritionProgress]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "userNutritionProgress"],
      });
    });
  });
});

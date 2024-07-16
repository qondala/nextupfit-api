import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "../../entities/coach.entity";
import { UserProgram } from "../../entities/user-program.entity";
import { User } from "../../entities/user.entity";
import { UsersService } from "../../modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (UserPrograms)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let userProgramRepository: Repository<UserProgram>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, UserProgram])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    userProgramRepository = module.get(getRepositoryToken(UserProgram));
  });

  describe("findOne", () => {
    it("should return a user with user programs", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const userProgram = await userProgramRepository.save({
        user: user,
        content: { id: 1 },
        startDate: new Date(),
        endDate: new Date(),
        programStatus: "active",
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.userPrograms).toEqual(
        expect.arrayContaining([userProgram]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "userPrograms"],
      });
    });
  });
});

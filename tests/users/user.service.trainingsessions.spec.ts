import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "src/entities/coach.entity";
import { TrainingSession } from "src/entities/training-session.entity";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (TrainingSessions)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let trainingSessionRepository: Repository<TrainingSession>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, TrainingSession])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    trainingSessionRepository = module.get(getRepositoryToken(TrainingSession));
  });

  describe("findOne", () => {
    it("should return a user with training sessions", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const trainingSession = await trainingSessionRepository.save({
        user: user,
        session: { id: 1 },
        attended: true,
        attendanceDate: new Date(),
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.trainingSessions).toEqual(
        expect.arrayContaining([trainingSession]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "trainingSessions"],
      });
    });
  });
});

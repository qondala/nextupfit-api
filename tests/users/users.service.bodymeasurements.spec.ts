import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { BodyMeasurement } from "src/entities/body-measurement.entity";
import { Coach } from "src/entities/coach.entity";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (BodyMeasurements)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let bodyMeasurementRepository: Repository<BodyMeasurement>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, BodyMeasurement])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    bodyMeasurementRepository = module.get(getRepositoryToken(BodyMeasurement));
  });

  describe("findOne", () => {
    it("should return a user with body measurements", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const bodyMeasurement = await bodyMeasurementRepository.save({
        user: user,
        dateRecorded: new Date(),
        weight: 80,
        height: 1.8,
        bodyFatPercentage: 15,
        muscleMass: 65,
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.bodyMeasurements).toEqual(
        expect.arrayContaining([bodyMeasurement]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "bodyMeasurements"],
      });
    });
  });
});

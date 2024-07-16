import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "src/entities/coach.entity";
import { User } from "src/entities/user.entity";
import { Notification } from "src/entities/notification.entity";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (Notifications)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let notificationRepository: Repository<Notification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, Notification])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    notificationRepository = module.get(getRepositoryToken(Notification));
  });

  describe("findOne", () => {
    it("should return a user with notifications", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const notification = await notificationRepository.save({
        user: user,
        message: "New notification",
        isRead: false,
        createdAt: new Date(),
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.notifications).toEqual(
        expect.arrayContaining([notification]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "notifications"],
      });
    });
  });
});

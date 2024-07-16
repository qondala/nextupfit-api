import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "src/entities/coach.entity";
import { ContentRating } from "src/entities/content-rating.entity";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (ContentRatings)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let contentRatingRepository: Repository<ContentRating>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, ContentRating])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    contentRatingRepository = module.get(getRepositoryToken(ContentRating));
  });

  describe("findOne", () => {
    it("should return a user with content ratings", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const contentRating = await contentRatingRepository.save({
        user: user,
        content: { id: 1 },
        rating: 4,
        comment: "Great content",
        ratingDate: new Date(),
        easeOfUse: 5,
        effectiveness: 5,
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.contentRatings).toEqual(
        expect.arrayContaining([contentRating]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "contentRatings"],
      });
    });
  });
});

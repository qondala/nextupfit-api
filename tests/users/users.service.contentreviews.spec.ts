import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "../../entities/coach.entity";
import { ContentReview } from "../../entities/content-review.entity";
import { User } from "../../entities/user.entity";
import { UsersService } from "../../modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService (ContentReviews)", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;
  let contentReviewRepository: Repository<ContentReview>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach, ContentReview])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
    contentReviewRepository = module.get(getRepositoryToken(ContentReview));
  });

  describe("findOne", () => {
    it("should return a user with content reviews", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const contentReview = await contentReviewRepository.save({
        user: user,
        content: { id: 1 },
        rating: 4,
        reviewText: "Excellent content!",
        reviewDate: new Date(),
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.contentReviews).toEqual(
        expect.arrayContaining([contentReview]),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach", "contentReviews"],
      });
    });
  });
});

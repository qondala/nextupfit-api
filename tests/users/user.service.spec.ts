import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Coach } from "src/entities/coach.entity";
import { User } from "src/entities/user.entity";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let coachRepository: Repository<Coach>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User, Coach])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    coachRepository = module.get(getRepositoryToken(Coach));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        password: "password",
      };
      const createdUser = await service.create(createUserDto);
      expect(createdUser).toBeDefined();
      expect(createdUser.email).toBe(createUserDto.email);
      expect(createdUser.firstName).toBe(createUserDto.firstName);
      expect(createdUser.lastName).toBe(createUserDto.lastName);
      expect(createdUser.passwordHash).toBeDefined();
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        passwordHash: expect.any(String),
      });
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
          passwordHash: expect.any(String),
        }),
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      const users = await service.findAll();
      expect(users).toBeInstanceOf(Array);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a user by ID", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(user.id);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ["coach"],
      });
    });

    it("should throw a NotFoundException if user not found", async () => {
      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a user by ID", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      const updateUserDto: UpdateUserDto = {
        firstName: "Updated Test",
      };
      const updatedUser = await service.update(user.id, updateUserDto);
      expect(updatedUser).toBeDefined();
      expect(updatedUser.firstName).toBe(updateUserDto.firstName);
      expect(userRepository.preload).toHaveBeenCalledWith({
        id: user.id,
        ...updateUserDto,
      });
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: user.id,
          firstName: "Updated Test",
        }),
      );
    });

    it("should throw a NotFoundException if user not found", async () => {
      jest.spyOn(userRepository, "preload").mockResolvedValue(null);
      await expect(service.update(1, {})).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should delete a user by ID", async () => {
      const user = await userRepository.save({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        passwordHash: "password",
      });
      await service.remove(user.id);
      expect(userRepository.delete).toHaveBeenCalledWith(user.id);
    });

    it("should throw a NotFoundException if user not found", async () => {
      jest
        .spyOn(userRepository, "delete")
        .mockRejectedValue(new Error("User not found"));
      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe("searchUsers", () => {
    it("should return an array of users matching the search query", async () => {
      const users = await service.searchUsers("Test");
      expect(users).toBeInstanceOf(Array);
      expect(userRepository.find).toHaveBeenCalledWith({
        where: [
          { firstName: "%Test%" },
          { lastName: "%Test%" },
          { email: "%Test%" },
        ],
        relations: ["coach"],
      });
    });
  });

  describe("createCoach", () => {
    it("should create a new coach and associate it with a user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        password: "password",
      };
      const createdUser = await service.createCoach(createUserDto);
      expect(createdUser).toBeDefined();
      expect(createdUser.email).toBe(createUserDto.email);
      expect(createdUser.firstName).toBe(createUserDto.firstName);
      expect(createdUser.lastName).toBe(createUserDto.lastName);
      expect(createdUser.passwordHash).toBeDefined();
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        passwordHash: expect.any(String),
      });
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
          passwordHash: expect.any(String),
        }),
      );
      expect(coachRepository.create).toHaveBeenCalledWith({
        user: expect.objectContaining({
          email: "test@example.com",
        }),
      });
      expect(coachRepository.save).toHaveBeenCalled();
    });
  });
});

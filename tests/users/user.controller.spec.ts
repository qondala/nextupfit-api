import { Test, TestingModule } from "@nestjs/testing";

import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { UpdateUserDto } from "../../modules/users/dto/update-user.dto";
import { UsersController } from "../../modules/users/users.controller";
import { UsersService } from "../../modules/users/users.service";
import { Repository } from "typeorm";
import { Request } from "express";

describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User])],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            searchUsers: jest.fn(),
            createCoach: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should call usersService.create", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        password: "password",
      };
      jest.spyOn(usersService, "create").mockResolvedValue({} as User);
      await controller.create(createUserDto);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("findAll", () => {
    it("should call usersService.findAll", async () => {
      jest.spyOn(usersService, "findAll").mockResolvedValue([]);
      await controller.findAll({ user: { id: 1 } } as unknown as Request);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should call usersService.findOne", async () => {
      const id = 1;
      jest.spyOn(usersService, "findOne").mockResolvedValue({} as User);
      await controller.findOne(id.toString());
      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should call usersService.update", async () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        firstName: "Updated Test",
      };
      jest.spyOn(usersService, "update").mockResolvedValue({} as User);
      await controller.update(id.toString(), updateUserDto);
      expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe("remove", () => {
    it("should call usersService.remove", async () => {
      const id = 1;
      jest.spyOn(usersService, "remove").mockResolvedValue({} as any);
      await controller.remove(id.toString());
      expect(usersService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe("getMe", () => {
    it("should call usersService.findOne", async () => {
      const userId = "1";
      jest.spyOn(usersService, "findOne").mockResolvedValue({} as User);
      await controller.getMe(userId);
      expect(usersService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe("searchUsers", () => {
    it("should call usersService.searchUsers", async () => {
      const query = "test";
      jest.spyOn(usersService, "searchUsers").mockResolvedValue([]);
      await controller.searchUsers(query);
      expect(usersService.searchUsers).toHaveBeenCalledWith(query);
    });
  });

  describe("createCoach", () => {
    it("should call usersService.createCoach", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        password: "password",
      };
      jest.spyOn(usersService, "createCoach").mockResolvedValue({} as User);
      await controller.createCoach(createUserDto);
      expect(usersService.createCoach).toHaveBeenCalledWith(createUserDto);
    });
  });
});

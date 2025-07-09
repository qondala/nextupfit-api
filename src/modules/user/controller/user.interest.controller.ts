import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { UserInterestService } from "../service";
import {
  CreateUserInterestDto,
  UpdateUserInterestDto,
  DetailsUserInterestDto,
  PaginatedDetailsUserInterestDto,
} from "../dto";

@ApiBearerAuth()
@ApiTags("User module endpoints")
@Controller("user/interest")
export class UserInterestController {
  constructor(private readonly userInterestService: UserInterestService) {}

  @Post()
  @ApiOperation({
    operationId: "createUserInterest",
    summary: "Create a new user interest"
  })
  @ApiBody({
    type: CreateUserInterestDto,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User interest created",
    type: DetailsUserInterestDto,
  })
  async create(@Body() createDto: CreateUserInterestDto): Promise<DetailsUserInterestDto> {
    const item = await this.userInterestService.create(createDto);
    const interest = await this.userInterestService.getUserInterestComposite(item.id, item.interestType);
    return {
      ...item,
      interest,
    };
  }

  @Post("/create-many")
  @ApiOperation({
    operationId: "createManyUserInterests",
    summary: "Create multiple user interests"
  })
  @ApiBody({
    type: CreateUserInterestDto,
    isArray: true,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User interests created",
    type: DetailsUserInterestDto,
    isArray: true,
  })
  async createMany(@Body() createDto: CreateUserInterestDto[]): Promise<DetailsUserInterestDto[]> {
    const userInterests = await this.userInterestService.createMany(createDto);

    return Promise.all(userInterests.map(async record => {
      const interest = await this.userInterestService.getUserInterestComposite(record.id, record.interestType);
      return {
        ...record,
        interest,
      };
    }));
  }

  @Get('user/:userId')
  @ApiOperation({
    operationId: "findAllUserInterests",
    summary: "Get all user interests with pagination"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 123
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number"
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Items per page"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of user interests",
    type: PaginatedDetailsUserInterestDto,
  })
  async findAll(
    @Param("userId", ParseIntPipe) userId: number,
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("limit", ParseIntPipe) limit: number = 10,
  ): Promise<PaginatedDetailsUserInterestDto> {
    const paginatedUserInterests = await this.userInterestService.findAll(userId, { page, limit });
    return {
      items: await Promise.all(paginatedUserInterests.items.map(async record => {
        const interest = await this.userInterestService.getUserInterestComposite(record.id, record.interestType);
        return {
          ...record,
          interest,
        };
      })),
      meta: paginatedUserInterests.meta,
    };
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getUserInterestById",
    summary: "Get a user interest by ID"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User interest ID"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The found user interest",
    type: DetailsUserInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User interest not found"
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserInterestDto> {
    const item = await this.userInterestService.findOne(id);
    if (!item) throw new NotFoundException(`User interest with ID ${id} not found`);
    const interest = await this.userInterestService.getUserInterestComposite(item.id, item.interestType);
    return {
      ...item,
      interest,
    };
  }

  @Put(":id")
  @ApiOperation({
    operationId: "updateUserInterest",
    summary: "Update a user interest by ID"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User interest ID"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The updated user interest",
    type: DetailsUserInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User interest not found"
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserInterestDto,
  ): Promise<DetailsUserInterestDto> {
    const item = await this.userInterestService.update(id, updateDto);
    if (!item) throw new NotFoundException(`User interest with ID ${id} not found`);
    const interest = await this.userInterestService.getUserInterestComposite(item.id, item.interestType);
    return {
      ...item,
      interest,
    };
  }
}

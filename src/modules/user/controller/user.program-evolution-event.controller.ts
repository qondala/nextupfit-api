import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam
} from "@nestjs/swagger";


import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { UserProgramEvolutionService } from "../service";
import {
  CreateUserProgramEvolutionEventDto,
  UpdateUserProgramEvolutionDto,
  DetailsUserProgramEvolutionEventDto,
  PaginatedDetailsUserProgramEvolutionEventDto
} from "../dto";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/program-evolution")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserProgramEvolutionController {
  constructor(private readonly userProgramEvolutionService: UserProgramEvolutionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user program evolution",
    operationId: "createUserProgramEvolution"
  })
  @ApiBody({
    required: true,
    type: CreateUserProgramEvolutionEventDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User program evolution created successfully",
    type: DetailsUserProgramEvolutionEventDto
  })
  create(@Body() createUserProgramEvolutionDto: CreateUserProgramEvolutionEventDto): Promise<DetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.create(createUserProgramEvolutionDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user program evolutions with pagination",
    operationId: "findAllUserProgramEvolutions"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions with pagination.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.findAll(options);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get all user program evolutions for a specific user",
    operationId: "findByUserIdUserProgramEvolutions"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user program evolutions for the specified user.",
    type: PaginatedDetailsUserProgramEvolutionEventDto,
  })
  findByUserId(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.findByUserId(userId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user program evolution by id",
    operationId: "findOneUserProgramEvolution"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user program evolution.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user program evolution",
    operationId: "updateUserProgramEvolution"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1
  })
  @ApiBody({
    required: true,
    type: UpdateUserProgramEvolutionDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user program evolution has been successfully updated.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserProgramEvolutionDto: UpdateUserProgramEvolutionDto
  ): Promise<DetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.update(id, updateUserProgramEvolutionDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user program evolution",
    operationId: "removeUserProgramEvolution"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User program evolution id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The user program evolution has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userProgramEvolutionService.remove(id);
  }
}

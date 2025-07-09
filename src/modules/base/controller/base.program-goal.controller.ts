import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
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

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import {
  CreateBaseProgramGoalDto,
  UpdateBaseProgramGoalDto,
  DetailsBaseProgramGoalDto,
  PaginatedDetailsBaseProgramGoalDto,
} from "../dto";

import { BaseProgramGoalService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/program-goal")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseProgramGoalController {
  constructor(private readonly baseProgramGoalService: BaseProgramGoalService) {}

  @Post()
  @ApiOperation({
    operationId: "createBaseProgramGoal",
    summary: "Create a new program goal",
  })
  @ApiBody({
    type: CreateBaseProgramGoalDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program goal has been successfully created.",
    type: DetailsBaseProgramGoalDto,
  })
  async create(
    @Body() createDto: CreateBaseProgramGoalDto,
  ): Promise<DetailsBaseProgramGoalDto> {
    return this.baseProgramGoalService.create(createDto);
  }

  @Get()
  @ApiOperation({
    operationId: "findAllBaseProgramGoals",
    summary: "Get all program goals with pagination",
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
    description: "Number of items per page"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of program goals",
    type: PaginatedDetailsBaseProgramGoalDto,
  })
  async findAll(
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("limit", ParseIntPipe) limit: number = 10,
  ): Promise<PaginatedDetailsBaseProgramGoalDto> {
    return this.baseProgramGoalService.findAll({ page, limit });
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getBaseProgramGoalById",
    summary: "Get a specific program goal by ID",
  })
  @ApiParam({ 
    name: "id", 
    required: true, 
    type: SwaggerType.INTEGER,
    description: "Program goal ID"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The found program goal",
    type: DetailsBaseProgramGoalDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Program goal not found"
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseProgramGoalDto> {
    const item = await this.baseProgramGoalService.findOne(id);
    if (!item) throw new NotFoundException(`Program goal with ID ${id} not found`);
    return item;
  }

  @Put(":id")
  @ApiOperation({
    operationId: "updateBaseProgramGoal",
    summary: "Update a program goal by ID",
  })
  @ApiParam({ 
    name: "id", 
    required: true, 
    type: SwaggerType.INTEGER,
    description: "Program goal ID"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The updated program goal",
    type: DetailsBaseProgramGoalDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Program goal not found"
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBaseProgramGoalDto,
  ): Promise<DetailsBaseProgramGoalDto> {
    const item = await this.baseProgramGoalService.update(id, updateDto);
    if (!item) throw new NotFoundException(`Program goal with ID ${id} not found`);
    return item;
  }

  @Delete(":id")
  @ApiOperation({
    operationId: "deleteBaseProgramGoal",
    summary: "Delete a program goal by ID",
  })
  @ApiParam({
    name: "id", 
    required: true, 
    type: SwaggerType.INTEGER,
    description: "Program goal ID"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Program goal successfully deleted"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Program goal not found"
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    const success = await this.baseProgramGoalService.remove(id);
    if (!success) throw new NotFoundException(`Program goal with ID ${id} not found`);
  }
}

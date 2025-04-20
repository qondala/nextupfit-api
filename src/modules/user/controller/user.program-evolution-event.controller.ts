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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";


import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { UserProgramEvolutionService } from "../service";
import {
  CreateUserProgramEvolutionEventDto,
  UpdateUserProgramEvolutionDto,
  DetailsUserProgramEvolutionEventDto
} from "../dto";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/program-evolution")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserProgramEvolutionController {
  constructor(private readonly userProgramEvolutionService: UserProgramEvolutionService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user program evolution" })
  @ApiResponse({
    status: 201,
    description: "The user program evolution has been successfully created.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  create(@Body() createUserProgramEvolutionDto: CreateUserProgramEvolutionEventDto): Promise<DetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.create(createUserProgramEvolutionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user program evolutions with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all user program evolutions with pagination.",
    type: [DetailsUserProgramEvolutionEventDto],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[DetailsUserProgramEvolutionEventDto[], number]> {
    return this.userProgramEvolutionService.findAll(options);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all user program evolutions for a specific user" })
  @ApiResponse({
    status: 200,
    description: "Return all user program evolutions for the specified user.",
    type: [DetailsUserProgramEvolutionEventDto],
  })
  findByUserId(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<[DetailsUserProgramEvolutionEventDto[], number]> {
    return this.userProgramEvolutionService.findByUserId(userId, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user program evolution by id" })
  @ApiResponse({
    status: 200,
    description: "Return the user program evolution.",
    type: DetailsUserProgramEvolutionEventDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserProgramEvolutionEventDto> {
    return this.userProgramEvolutionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user program evolution" })
  @ApiResponse({
    status: 200,
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
  @ApiOperation({ summary: "Delete a user program evolution" })
  @ApiResponse({
    status: 200,
    description: "The user program evolution has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userProgramEvolutionService.remove(id);
  }
}

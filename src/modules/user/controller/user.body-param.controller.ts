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

import { PaginationOptionsDto } from "@app/common/dto";

import { UserBodyParamService } from "../service";
import {
  CreateUserBodyParamDto,
  UpdateUserBodyParamDto,
  DetailsUserBodyParamDto,
} from "../dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/body-param")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserBodyParamController {
  constructor(private readonly userBodyParamService: UserBodyParamService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user body param" })
  @ApiResponse({
    status: 201,
    description: "The user body param has been successfully created.",
    type: DetailsUserBodyParamDto,
  })
  create(@Body() createUserBodyParamDto: CreateUserBodyParamDto): Promise<DetailsUserBodyParamDto> {
    return this.userBodyParamService.create(createUserBodyParamDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user body params with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all user body params with pagination.",
    type: [DetailsUserBodyParamDto],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[DetailsUserBodyParamDto[], number]> {
    return this.userBodyParamService.findAll(options);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all user body params for a specific user" })
  @ApiResponse({
    status: 200,
    description: "Return all user body params for the specified user.",
    type: [DetailsUserBodyParamDto],
  })
  findByUserId(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<[DetailsUserBodyParamDto[], number]> {
    return this.userBodyParamService.findByUserId(userId, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user body param by id" })
  @ApiResponse({
    status: 200,
    description: "Return the user body param.",
    type: DetailsUserBodyParamDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserBodyParamDto> {
    return this.userBodyParamService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user body param" })
  @ApiResponse({
    status: 200,
    description: "The user body param has been successfully updated.",
    type: DetailsUserBodyParamDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserBodyParamDto: UpdateUserBodyParamDto
  ): Promise<DetailsUserBodyParamDto> {
    return this.userBodyParamService.update(id, updateUserBodyParamDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user body param" })
  @ApiResponse({
    status: 200,
    description: "The user body param has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userBodyParamService.remove(id);
  }
}

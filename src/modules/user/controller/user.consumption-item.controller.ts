import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import { UserConsumptionItemService } from "../service";
import {
  CreateUserConsumptionItemDto,
  UpdateUserConsumptionItemDto,
  DetailsUserConsumptionItemDto,
  PaginatedDetailsUserConsumptionItemDto,
} from "../dto";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user/consumption-item")
export class UserConsumptionItemController {
  constructor(private readonly service: UserConsumptionItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a user consumption item",
    operationId: "createUserConsumptionItem"
  })
  @ApiBody({
    type: CreateUserConsumptionItemDto,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsUserConsumptionItemDto,
    description: "Created successfully"
  })
  create(@Body() dto: CreateUserConsumptionItemDto): Promise<DetailsUserConsumptionItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user consumption items",
    operationId: "findAllUserConsumptionItems"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsUserConsumptionItemDto
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserConsumptionItemDto> {
    return this.service.findAll(options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get consumption item by id",
    operationId: "findUserConsumptionItemById"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsUserConsumptionItemDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserConsumptionItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update consumption item",
    operationId: "updateUserConsumptionItem"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiBody({
    type: UpdateUserConsumptionItemDto,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsUserConsumptionItemDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserConsumptionItemDto
  ): Promise<DetailsUserConsumptionItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete consumption item",
    operationId: "removeUserConsumptionItem"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Deleted successfully"
  })
  remove(
    @Param("id", ParseIntPipe) id: number
  ): Promise<void> {
    return this.service.remove(id);
  }
}

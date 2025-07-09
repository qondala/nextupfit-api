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

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateContentOrderedlistDto,
  UpdateContentOrderedlistDto,
  DetailsContentOrderedlistDto,
  PaginatedDetailsContentOrderedlistDto,
} from "../dto";

import { ContentOrderedlistService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/orderedlist")
export class ContentOrderedlistController {
  constructor(private readonly service: ContentOrderedlistService) {}

  @Post()
  @ApiOperation({
    summary: "Create ordered list",
    operationId: "createContentOrderedlist",
  })
  @ApiBody({
    type: CreateContentOrderedlistDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentOrderedlistDto,
  })
  async create(@Body() dto: CreateContentOrderedlistDto): Promise<DetailsContentOrderedlistDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all ordered lists",
    operationId: "findAllContentOrderedlists",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentOrderedlistDto,
  })
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentOrderedlistDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one ordered list",
    operationId: "findOneContentOrderedlist",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentOrderedlistDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentOrderedlistDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update ordered list",
    operationId: "updateContentOrderedlist",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentOrderedlistDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentOrderedlistDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentOrderedlistDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete ordered list",
    operationId: "deleteContentOrderedlist",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentOrderedlistDto,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import { ContentChallengesService } from "../service";
import {
  CreateContentChallengesDto,
  UpdateContentChallengesDto,
  DetailsContentChallengesDto,
  PaginatedDetailsContentChallengesDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/challenges")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentChallengesController {
  constructor(private readonly service: ContentChallengesService) {}

  @Post()
  @ApiOperation({
    summary: "Create challenges",
    operationId: "createContentChallenges",
  })
  @ApiBody({
    type: CreateContentChallengesDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentChallengesDto,
  })
  async create(@Body() dto: CreateContentChallengesDto): Promise<DetailsContentChallengesDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get challenges",
    operationId: "findAllContentChallenges",
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
    type: PaginatedDetailsContentChallengesDto,
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentChallengesDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get challenges",
    operationId: "findOneContentChallenges",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChallengesDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentChallengesDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update challenges",
    operationId: "updateContentChallenges",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentChallengesDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChallengesDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentChallengesDto,
  ): Promise<DetailsContentChallengesDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete challenges",
    operationId: "removeContentChallenges",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Challenges deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}

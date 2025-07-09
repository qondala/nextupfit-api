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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentChallengesDto,
  })
  create(@Body() dto: CreateContentChallengesDto): Promise<DetailsContentChallengesDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get challenges",
    operationId: "findAllContentChallenges",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentChallengesDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentChallengesDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get challenges",
    operationId: "findOneContentChallenges",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChallengesDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentChallengesDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update challenges",
    operationId: "updateContentChallenges",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChallengesDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentChallengesDto,
  ): Promise<DetailsContentChallengesDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete challenges",
    operationId: "removeContentChallenges",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}

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
  ParseIntPipe
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateBaseRecipeInstructionTagDto,
  UpdateBaseRecipeInstructionTagDto,
  DetailsBaseRecipeInstructionTagDto,
  PaginatedDetailsBaseRecipeInstructionTagDto
} from "../dto";
import { BaseRecipeInstructionTagService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/recipe-instruction-tag")
export class BaseRecipeInstructionTagController {
  constructor(private readonly tagService: BaseRecipeInstructionTagService) {}

  @Post()
  @ApiOperation({
    summary: "Create recipe instruction tag",
    operationId: "createBaseRecipeInstructionTag"
  })
  @ApiCreatedResponse({
    description: "Recipe instruction tag created successfully.",
    type: DetailsBaseRecipeInstructionTagDto,
    status: HttpStatus.CREATED
  })
  create(@Body() createDto: CreateBaseRecipeInstructionTagDto): Promise<DetailsBaseRecipeInstructionTagDto> {
    return this.tagService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all recipe instruction tags",
    operationId: "findAllBaseRecipeInstructionTags"
  })
  @ApiOkResponse({
    description: "List of recipe instruction tags.",
    type: PaginatedDetailsBaseRecipeInstructionTagDto
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsBaseRecipeInstructionTagDto> {
    return this.tagService.findAll(paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get recipe instruction tag by id",
    operationId: "findBaseRecipeInstructionTagById"
  })
  @ApiOkResponse({
    description: "Recipe instruction tag by id.",
    type: DetailsBaseRecipeInstructionTagDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseRecipeInstructionTagDto> {
    return this.tagService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update recipe instruction tag",
    operationId: "updateBaseRecipeInstructionTag"
  })
  @ApiOkResponse({
    description: "Updated recipe instruction tag.",
    type: DetailsBaseRecipeInstructionTagDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBaseRecipeInstructionTagDto
  ): Promise<DetailsBaseRecipeInstructionTagDto> {
    return this.tagService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete recipe instruction tag",
    operationId: "removeBaseRecipeInstructionTag"
  })
  @ApiOkResponse({
    description: "Recipe instruction tag deleted successfully."
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.tagService.remove(id);
  }
}

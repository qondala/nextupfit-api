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
  CreateBaseRecipeInstructionDto,
  UpdateBaseRecipeInstructionDto,
  DetailsBaseRecipeInstructionDto,
  PaginatedDetailsBaseRecipeInstructionDto
} from "../dto";
import { BaseRecipeInstructionService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/recipe-instruction")
export class BaseRecipeInstructionController {
  constructor(private readonly instructionService: BaseRecipeInstructionService) {}

  @Post()
  @ApiOperation({
    summary: "Create recipe instruction",
    operationId: "createBaseRecipeInstruction"
  })
  @ApiCreatedResponse({
    description: "Recipe instruction created successfully.",
    type: DetailsBaseRecipeInstructionDto,
    status: HttpStatus.CREATED
  })
  create(@Body() createDto: CreateBaseRecipeInstructionDto): Promise<DetailsBaseRecipeInstructionDto> {
    return this.instructionService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all recipe instructions",
    operationId: "findAllBaseRecipeInstructions"
  })
  @ApiOkResponse({
    description: "List of recipe instructions.",
    type: PaginatedDetailsBaseRecipeInstructionDto
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsBaseRecipeInstructionDto> {
    return this.instructionService.findAll(paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get recipe instruction by id",
    operationId: "findBaseRecipeInstructionById"
  })
  @ApiOkResponse({
    description: "Recipe instruction by id.",
    type: DetailsBaseRecipeInstructionDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseRecipeInstructionDto> {
    return this.instructionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update recipe instruction",
    operationId: "updateBaseRecipeInstruction"
  })
  @ApiOkResponse({
    description: "Updated recipe instruction.",
    type: DetailsBaseRecipeInstructionDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBaseRecipeInstructionDto
  ): Promise<DetailsBaseRecipeInstructionDto> {
    return this.instructionService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete recipe instruction",
    operationId: "removeBaseRecipeInstruction"
  })
  @ApiOkResponse({
    description: "Recipe instruction deleted successfully."
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.instructionService.remove(id);
  }
}

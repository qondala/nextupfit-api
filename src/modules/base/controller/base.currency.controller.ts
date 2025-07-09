import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ParseIntPipe } from "@nestjs/common";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import {
  CreateBaseCurrencyDto,
  UpdateBaseCurrencyDto,
  PaginatedDetailsBaseCurrencyDto,
  DetailsBaseCurrencyDto,
} from "../dto";
import { BaseCurrencyService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/currency")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseCurrencyController {
  constructor(private readonly baseCurrencyService: BaseCurrencyService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new currency",
    description: "Create a new currency",
    operationId: "createCurrency",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The currency has been successfully created.",
    type: DetailsBaseCurrencyDto,
  })
  async create(
    @Body() createDto: CreateBaseCurrencyDto,
  ): Promise<DetailsBaseCurrencyDto> {
    try {
      return (await this.baseCurrencyService.create(createDto)) as unknown as DetailsBaseCurrencyDto;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestException("Currency with these details already exists");
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: "Get all currencies with pagination",
    description: "Get all currencies with pagination",
    operationId: "getAllCurrencies",
  })
  @ApiQuery({ name: "page", description: "Page number", required: false, type: SwaggerType.INTEGER })
  @ApiQuery({ name: "limit", description: "Number of items per page", required: false, type: SwaggerType.INTEGER })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of currencies",
    type: PaginatedDetailsBaseCurrencyDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ): Promise<PaginatedDetailsBaseCurrencyDto> {
    return (await this.baseCurrencyService.findAll({ page: +page, limit: +limit })) as unknown as PaginatedDetailsBaseCurrencyDto;
  }

  @Get("search")
  @ApiOperation({
    summary: "Search currencies by query string with pagination",
    description: "Search currencies by query string with pagination",
    operationId: "searchCurrencies",
  })
  @ApiQuery({ name: "q", description: "Search query string", required: true, type: SwaggerType.STRING })
  @ApiQuery({ name: "page", description: "Page number", required: false, type: SwaggerType.INTEGER })
  @ApiQuery({ name: "limit", description: "Number of items per page", required: false, type: SwaggerType.INTEGER })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of currencies",
    type: PaginatedDetailsBaseCurrencyDto,
  })
  async search(
    @Query("q") query: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ): Promise<PaginatedDetailsBaseCurrencyDto> {
    return (await this.baseCurrencyService.search(query, { page: +page, limit: +limit })) as unknown as PaginatedDetailsBaseCurrencyDto;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a currency by ID", description: "Get a currency by ID", operationId: "getCurrency" })
  @ApiParam({ name: "id", type: SwaggerType.INTEGER, description: "Identifier" })
  @ApiResponse({ status: HttpStatus.OK, type: DetailsBaseCurrencyDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Currency not found" })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseCurrencyDto> {
    const currency = await this.baseCurrencyService.findOne(id);
    if (!currency) {
      throw new NotFoundException("Currency not found");
    }
    return currency as unknown as DetailsBaseCurrencyDto;
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a currency", description: "Update a currency", operationId: "updateCurrency" })
  @ApiParam({ name: "id", type: SwaggerType.INTEGER, description: "Identifier" })
  @ApiResponse({ status: HttpStatus.OK, type: DetailsBaseCurrencyDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Currency not found" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBaseCurrencyDto,
  ): Promise<DetailsBaseCurrencyDto> {
    const updated = await this.baseCurrencyService.update(id, updateDto);
    if (!updated) {
      throw new NotFoundException("Currency not found");
    }
    return updated as unknown as DetailsBaseCurrencyDto;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a currency", description: "Delete a currency", operationId: "deleteCurrency" })
  @ApiParam({ name: "id", type: SwaggerType.INTEGER, description: "Identifier" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Currency deleted" })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    const removed = await this.baseCurrencyService.remove(id);
    if (!removed) {
      throw new NotFoundException("Currency not found");
    }
  }
}

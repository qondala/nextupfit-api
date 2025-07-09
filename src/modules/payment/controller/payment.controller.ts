import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import {
  CreatePaymentDto,
  UpdatePaymentDto,
  DetailsPaymentDto,
  PaginatedDetailsPaymentDto,
} from "../dto";
import { PaymentService } from "../service";

@ApiTags("Payment")
@ApiBearerAuth()
@Controller("payment")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({
    summary: "Create payment",
    description: "Create payment",
    operationId: "createPayment",
    tags: ["Payment"],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsPaymentDto,
  })
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    // assuming userId from token guard, here just sample param
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsPaymentDto> {
    return await this.paymentService.create(createPaymentDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: "Get payments paginated",
    description: "Get payments paginated",
    operationId: "getPaymentsPaginated",
    tags: ["Payment"],
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
  @ApiQuery({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsPaymentDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<PaginatedDetailsPaymentDto> {
    return await this.paymentService.findAll({ page: +page, limit: +limit }, userId);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsPaymentDto> {
    return await this.paymentService.findOne(id);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdatePaymentDto,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsPaymentDto> {
    return await this.paymentService.update(id, updateDto, userId);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<void> {
    return await this.paymentService.remove(id, userId);
  }
}

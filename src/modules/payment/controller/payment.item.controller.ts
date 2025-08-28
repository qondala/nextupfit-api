import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { PaginationOptionsDto } from '@app/common/dto';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import { PaymentItemService } from '../service';

import {
  CreatePaymentItemDto,
  UpdatePaymentItemDto,
  DetailsPaymentItemDto,
  PaginatedDetailsPaymentItemDto,
} from '../dto';


@ApiTags("Payment module endpoints")
@ApiBearerAuth()
@Controller("payment/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentItemController {
  constructor(private readonly paymentItemService: PaymentItemService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new payment item',
    operationId: 'createPaymentItem',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsPaymentItemDto,
    description: 'Payment item created successfully',
  })
  async create(@Body() createDto: CreatePaymentItemDto): Promise<DetailsPaymentItemDto> {
    return this.paymentItemService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a payment item by ID',
    operationId: 'getPaymentItem',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Payment item ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentItemDto,
    description: 'Payment item found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsPaymentItemDto> {
    return this.paymentItemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a payment item',
    operationId: 'updatePaymentItem',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Payment item ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentItemDto,
    description: 'Payment item updated successfully',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePaymentItemDto,
  ): Promise<DetailsPaymentItemDto> {
    return this.paymentItemService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a payment item',
    operationId: 'deletePaymentItem',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Payment item ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment item deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.paymentItemService.remove(id);
  }

  @Get('by-payment/:paymentId')
  @ApiOperation({
    summary: 'Get all payment items by payment ID',
    operationId: 'getPaymentItemsByPayment',
  })
  @ApiParam({
    name: 'paymentId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Payment ID',
  })
  @ApiQuery({
    name: 'pagination',
    required: true,
    type: PaginationOptionsDto,
    description: 'Pagination options',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsPaymentItemDto,
    description: 'List of payment items',
  })
  async findByPaymentId(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Query('pagination') pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsPaymentItemDto> {
    return this.paymentItemService.findAllByPaymentId(paymentId, pagination);
  }
}

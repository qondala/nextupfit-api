import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreatePaymentTransferDto, UpdatePaymentTransferDto } from '../dto';
import { PaymentTransferService } from '../service';
import { PaymentTransferEntity } from '../entity';


@ApiTags('Payment module endpoints')
@ApiBearerAuth()
@Controller('payment/transfer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentTransferController {
  constructor(private readonly paymentTransferService: PaymentTransferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment transfer' })
  @ApiResponse({ status: 201, description: 'Payment transfer created successfully.' })
  create(
    @Body() createDto: CreatePaymentTransferDto,
    @User('id') userId: number
  ) {
    return this.paymentTransferService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payment transfers' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<PaymentTransferEntity>> {
    return this.paymentTransferService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment transfer by id' })
  findOne(@Param('id') id: string) {
    return this.paymentTransferService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update payment transfer' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePaymentTransferDto,
    @User('id') userId: number
  ) {
    return this.paymentTransferService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payment transfer' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.paymentTransferService.remove(+id, userId);
  }
}

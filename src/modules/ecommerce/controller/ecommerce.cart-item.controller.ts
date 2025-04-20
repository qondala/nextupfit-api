import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { User } from '@app/common/decorators';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';
import { EcommerceCartItemService } from '../service';
import { CreateEcommerceCartItemDTO, UpdateEcommerceCartItemDTO } from '../dto';
import { EcommerceCartItem } from '../entity';

@ApiTags('Ecommerce module endpoints')
@ApiBearerAuth()
@Controller('ecommerce/cart-item')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EcommerceCartItemController {
  constructor(private readonly cartItemService: EcommerceCartItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  create(@Body() createDto: CreateEcommerceCartItemDTO) {
    return this.cartItemService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<EcommerceCartItem>> {
    return this.cartItemService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cart item by id' })
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cart item' })
  update(@Param('id') id: string, @Body() updateDto: UpdateEcommerceCartItemDTO) {
    return this.cartItemService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cart item' })
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}

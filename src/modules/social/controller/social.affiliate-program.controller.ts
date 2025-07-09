import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery
} from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAffiliateProgramDto, UpdateSocialAffiliateProgramDto } from '../dto';
import { SocialAffiliateProgramService } from '../service';
import { SocialAffiliateProgramEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/affiliate/program')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialAffiliateProgramController {
  constructor(private readonly affiliateProgramService: SocialAffiliateProgramService) {}

  @Post()
  @ApiOperation({ summary: 'Create an affiliate program' })
  @ApiResponse({ status: 201, description: 'Affiliate program created successfully.' })
  create(
    @Body() createDto: CreateSocialAffiliateProgramDto,
    @User('id') userId: number
  ) {
    return this.affiliateProgramService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all affiliate programs' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialAffiliateProgramEntity>> {
    return this.affiliateProgramService.findAll(paginationOptions, userId);
  }

  @Get('public')
  @ApiOperation({ summary: 'Get all public affiliate programs' })
  async findAllPublic(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<SocialAffiliateProgramEntity>> {
    return this.affiliateProgramService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get affiliate program by id' })
  findOne(@Param('id') id: string) {
    return this.affiliateProgramService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update affiliate program' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialAffiliateProgramDto
  ) {
    return this.affiliateProgramService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete affiliate program' })
  remove(@Param('id') id: string) {
    return this.affiliateProgramService.remove(+id);
  }
}

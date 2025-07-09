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
  HttpStatus,
  ParseIntPipe,
  ConflictException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import {
  CreateGymOpenDayDto,
  UpdateGymOpenDayDto,
  DetailsGymOpenDayDto,
  PaginatedDetailsGymOpenDayDto
} from '../dto';
import { GymOpenDayService } from '../service';
import { SwaggerType } from '@app/common/types';
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode
} from '@app/common/exceptions';


@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym/opening-day')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymOpenDayController {
  constructor(private readonly gymOpenDayService: GymOpenDayService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gym open day',
    operationId: 'createGymOpenDay'
  })
  @ApiBody({
    required: true,
    type: CreateGymOpenDayDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym open day created successfully.',
    type: DetailsGymOpenDayDto
  })
  @ApiConflictResponse({
    description: 'Gym open day already exists',
    type: ErrorResponseException
  })
  async create(@Body() createDto: CreateGymOpenDayDto): Promise<DetailsGymOpenDayDto> {
    try {
      return await this.gymOpenDayService.create(createDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ErrorResponseException(
          ErrorResponseExceptionType.DATABASE,
          'Gym open day already exists',
          HttpStatus.CONFLICT,
          SystemStatusCode.CONFLICT
        );
      }
      throw error;
    }
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get all opening days of a gym',
    operationId: 'getGymOpenDaysByGymId'
  })
  @ApiParam({
    name: 'gymId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of gym open days',
    type: PaginatedDetailsGymOpenDayDto
  })
  async findByGym(
    @Param('gymId') gymId: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymOpenDayDto> {
    return await this.gymOpenDayService.findByGym(+gymId, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gym open day by id',
    operationId: 'getGymOpenDayById'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym open day details',
    type: DetailsGymOpenDayDto
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsGymOpenDayDto> {
    return await this.gymOpenDayService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update gym opening day',
    operationId: 'updateGymOpenDay'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gym open day updated successfully.',
    type: DetailsGymOpenDayDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymOpenDayDto
  ): Promise<DetailsGymOpenDayDto> {
    return await this.gymOpenDayService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete gym opening day',
    operationId: 'deleteGymOpenDay'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Gym open day deleted successfully.'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.gymOpenDayService.remove(id);
  }
}

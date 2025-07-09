import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';

import { CreateGymDto, PaginatedDetailsGymDto, UpdateGymDto } from '../dto';
import { GymService } from '../service';
import { DetailsGymDto } from '../dto';
import { SwaggerType } from '@app/common/types';
import { ErrorResponseException, ErrorResponseExceptionType, SystemStatusCode } from '@app/common/exceptions';

@ApiTags('Gym module endpoints')
@ApiBearerAuth()
@Controller('gym')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymController {

  constructor(private readonly gymService: GymService) {}

  @Post()
  @ApiOperation({
    operationId: 'createGym',
    summary: 'Create a new gym'
  })
  @ApiCreatedResponse({
    description: 'Gym created successfully.',
    type: DetailsGymDto
  })
  create(
    @Body() createDto: CreateGymDto
  ): Promise<DetailsGymDto> {
    return this.gymService.create(createDto);
  }

  @Get('search')
  @ApiOperation({
    operationId: 'searchGyms',
    summary: 'Search gyms by name'
  })
  @ApiOkResponse({
    description: 'Paginated list of gyms matching query.',
    type: PaginatedDetailsGymDto
  })
  @ApiQuery({
    name: 'query',
    required: true,
    type: SwaggerType.STRING
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
  async search(
    @Query('query') query: string,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.search(query, paginationOptions);
  }

  @Get()
  @ApiOperation({
    operationId: 'findAllGyms',
    summary: 'Get all gyms'
  })
  @ApiOkResponse({
    description: 'List of gyms.',
    type: PaginatedDetailsGymDto
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
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findAll(paginationOptions);
  }


  @Get('best-rated-and-attended')
  @ApiOperation({
    operationId: 'findBestRatedAndAttentedGyms',
    summary: 'Get best rated and attended gyms'
  })
  @ApiOkResponse({
    description: 'List of gyms.',
    type: PaginatedDetailsGymDto
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
  async findBestRatedAndAttented(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttented(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'findGymById',
    summary: 'Get gym by id'
  })
  @ApiOkResponse({
    description: 'Gym by id.',
    type: DetailsGymDto
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym not found',
    type: ErrorResponseException,
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    const record = this.gymService.findOne(+id);
    if (!record) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `Gym with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return record;
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'updateGym',
    summary: 'Update gym'
  })
  @ApiOkResponse({
    description: 'Updated gym.',
    type: DetailsGymDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym not found',
    type: ErrorResponseException,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymDto,
  ): Promise<DetailsGymDto> {
    const record = this.gymService.update(+id, updateDto);
    if (!record) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `Gym with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return record;
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'removeGym',
    summary: 'Delete gym'
  })
  @ApiOkResponse({
    description: 'Deleted gym.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Gym not found',
    type: ErrorResponseException,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    const ok = this.gymService.remove(id);
    if (!ok) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `Gym with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return ok;
  }
}

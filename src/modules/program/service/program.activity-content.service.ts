import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ProgramActivityContentEntity } from "../entity";
import { CreateProgramActivityContentDto, UpdateProgramActivityContentDto } from "../dto";

@Injectable()
export class ProgramActivityContentService {
  constructor(
    @InjectRepository(ProgramActivityContentEntity)
    private readonly programActivityContentRepository: Repository<ProgramActivityContentEntity>
  ) {}

  async create(createProgramActivityContentDto: CreateProgramActivityContentDto): Promise<ProgramActivityContentEntity> {
    const programActivityContent = this.programActivityContentRepository.create(createProgramActivityContentDto);
    return await this.programActivityContentRepository.save(programActivityContent);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramActivityContentEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programActivityContentRepository.createQueryBuilder("programActivityContent");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("programActivityContent.createdAt", "DESC")
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<ProgramActivityContentEntity> {
    const programActivityContent = await this.programActivityContentRepository.findOne({ where: { id } });
    if (!programActivityContent) {
      throw new Error(`Program activity content with ID ${id} not found`);
    }
    return programActivityContent;
  }

  async update(id: number, updateProgramActivityContentDto: UpdateProgramActivityContentDto): Promise<ProgramActivityContentEntity> {
    const programActivityContent = await this.findOne(id);
    Object.assign(programActivityContent, updateProgramActivityContentDto);
    return await this.programActivityContentRepository.save(programActivityContent);
  }

  async remove(id: number): Promise<void> {
    await this.programActivityContentRepository.delete(id);
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PerformanceRecord } from "../../entities/performance-record.entity";
import { Repository } from "typeorm";
import { CreatePerformanceRecordDto } from "./dto/create-performancerecords.dto";
import { UpdatePerformanceRecordDto } from "./dto/update-performancerecords.dto";

@Injectable()
export class PerformanceRecordsService {
  constructor(
    @InjectRepository(PerformanceRecord)
    private performanceRecordsRepository: Repository<PerformanceRecord>,
  ) {}

  async create(
    createPerformanceRecordDto: CreatePerformanceRecordDto,
    userId: number,
  ): Promise<PerformanceRecord> {
    const performanceRecord = this.performanceRecordsRepository.create({
      ...createPerformanceRecordDto,
      userProgram: { id: createPerformanceRecordDto.userProgramId },
    });
    return this.performanceRecordsRepository.save(performanceRecord);
  }

  async findAll(): Promise<PerformanceRecord[]> {
    return this.performanceRecordsRepository.find({
      relations: ["userProgram"],
    });
  }

  async findOne(id: number): Promise<PerformanceRecord> {
    const performanceRecord = await this.performanceRecordsRepository.findOne({
      where: { id },
      relations: ["userProgram"],
    });
    if (!performanceRecord) {
      throw new NotFoundException(`Performance record with ID ${id} not found`);
    }
    return performanceRecord;
  }

  async update(
    id: number,
    updatePerformanceRecordDto: UpdatePerformanceRecordDto,
    userId: number,
  ): Promise<PerformanceRecord> {
    const performanceRecord = await this.performanceRecordsRepository.preload({
      id,
      ...updatePerformanceRecordDto,
    });
    if (!performanceRecord) {
      throw new NotFoundException(`Performance record with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier l'enregistrement de performance
    if (performanceRecord.userProgram.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this performance record",
      );
    }
    return this.performanceRecordsRepository.save(performanceRecord);
  }

  async remove(id: number, userId: number): Promise<void> {
    const performanceRecord = await this.performanceRecordsRepository.findOne({
      where: { id },
    });
    if (!performanceRecord) {
      throw new NotFoundException(`Performance record with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer l'enregistrement de performance
    if (performanceRecord.userProgram.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this performance record",
      );
    }
    await this.performanceRecordsRepository.delete(id);
  }

  async searchPerformanceRecords(query: string): Promise<PerformanceRecord[]> {
    const performanceRecords = await this.performanceRecordsRepository.find({
      where: [
        { userProgram: { user: { firstName: `%${query}%` } } },
        { userProgram: { user: { lastName: `%${query}%` } } },
        { userProgram: { user: { email: `%${query}%` } } },
        { userProgram: { content: { title: `%${query}%` } } },
        { userProgram: { content: { description: `%${query}%` } } },
        { performanceDescription: `%${query}%` },
      ],
      relations: ["userProgram"],
    });
    return performanceRecords;
  }

  async findByUserProgram(userProgramId: number): Promise<PerformanceRecord[]> {
    const performanceRecords = await this.performanceRecordsRepository.find({
      where: { userProgram: { id: userProgramId } },
      relations: ["userProgram"],
    });
    if (!performanceRecords) {
      throw new NotFoundException(
        `Performance records for user program ${userProgramId} not found`,
      );
    }
    return performanceRecords;
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoachQualificationDto } from "./dto/create-coachqualification.dto";
import { UpdateCoachQualificationDto } from "./dto/update-coachqualification.dto";
import { CoachQualification } from "../../entities/coach-qualification.entity";

@Injectable()
export class CoachQualificationsService {
  constructor(
    @InjectRepository(CoachQualification)
    private coachQualificationsRepository: Repository<CoachQualification>,
  ) {}

  async create(
    createCoachQualificationDto: CreateCoachQualificationDto,
    coachId: number,
  ): Promise<CoachQualification> {
    const coachQualification = this.coachQualificationsRepository.create({
      ...createCoachQualificationDto,
      coach: { id: coachId },
    });
    return this.coachQualificationsRepository.save(coachQualification);
  }

  async findAll(): Promise<CoachQualification[]> {
    return this.coachQualificationsRepository.find({
      relations: ["coach"],
    });
  }

  async findOne(id: number): Promise<CoachQualification> {
    const coachQualification = await this.coachQualificationsRepository.findOne(
      {
        where: { id },
        relations: ["coach"],
      },
    );
    if (!coachQualification) {
      throw new NotFoundException(
        `Coach qualification with ID ${id} not found`,
      );
    }
    return coachQualification;
  }

  async update(
    id: number,
    updateCoachQualificationDto: UpdateCoachQualificationDto,
    coachId: number,
  ): Promise<CoachQualification> {
    const coachQualification = await this.coachQualificationsRepository.preload(
      {
        id,
        ...updateCoachQualificationDto,
      },
    );
    if (!coachQualification) {
      throw new NotFoundException(
        `Coach qualification with ID ${id} not found`,
      );
    }
    // Vérifier que le coach est autorisé à modifier sa qualification
    if (coachQualification.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this coach qualification",
      );
    }
    return this.coachQualificationsRepository.save(coachQualification);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const coachQualification = await this.coachQualificationsRepository.findOne(
      {
        where: { id },
      },
    );
    if (!coachQualification) {
      throw new NotFoundException(
        `Coach qualification with ID ${id} not found`,
      );
    }
    // Vérifier que le coach est autorisé à supprimer sa qualification
    if (coachQualification.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this coach qualification",
      );
    }
    await this.coachQualificationsRepository.delete(id);
  }

  async searchCoachQualifications(
    query: string,
  ): Promise<CoachQualification[]> {
    const coachQualifications = await this.coachQualificationsRepository.find({
      where: [
        { coach: { user: { firstName: `%${query}%` } } },
        { coach: { user: { lastName: `%${query}%` } } },
        { coach: { user: { email: `%${query}%` } } },
        { qualificationName: `%${query}%` },
        { institutionName: `%${query}%` },
      ],
      relations: ["coach"],
    });
    return coachQualifications;
  }

  async findByCoach(coachId: number): Promise<CoachQualification[]> {
    const coachQualifications = await this.coachQualificationsRepository.find({
      where: { coach: { id: coachId } },
      relations: ["coach"],
    });
    if (!coachQualifications) {
      throw new NotFoundException(
        `Coach qualifications for coach ${coachId} not found`,
      );
    }
    return coachQualifications;
  }
}

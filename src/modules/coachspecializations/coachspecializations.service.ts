import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoachSpecialization } from "../../entities/coach-specialization.entity";
import { Repository } from "typeorm";
import { CreateCoachSpecializationDto } from "./dto/create-coachspecialization.dto";
import { UpdateCoachSpecializationDto } from "./dto/update-coachspecialization.dto";

@Injectable()
export class CoachSpecializationsService {
  constructor(
    @InjectRepository(CoachSpecialization)
    private coachSpecializationsRepository: Repository<CoachSpecialization>,
  ) {}

  async create(
    createCoachSpecializationDto: CreateCoachSpecializationDto,
    coachId: number,
  ): Promise<CoachSpecialization> {
    const coachSpecialization = this.coachSpecializationsRepository.create({
      ...createCoachSpecializationDto,
      coach: { id: coachId },
    });
    return this.coachSpecializationsRepository.save(coachSpecialization);
  }

  async findAll(): Promise<CoachSpecialization[]> {
    return this.coachSpecializationsRepository.find({
      relations: ["coach"],
    });
  }

  async findOne(id: number): Promise<CoachSpecialization> {
    const coachSpecialization =
      await this.coachSpecializationsRepository.findOne({
        where: { id },
        relations: ["coach"],
      });
    if (!coachSpecialization) {
      throw new NotFoundException(
        `Coach specialization with ID ${id} not found`,
      );
    }
    return coachSpecialization;
  }

  async update(
    id: number,
    updateCoachSpecializationDto: UpdateCoachSpecializationDto,
    coachId: number,
  ): Promise<CoachSpecialization> {
    const coachSpecialization =
      await this.coachSpecializationsRepository.preload({
        id,
        ...updateCoachSpecializationDto,
      });
    if (!coachSpecialization) {
      throw new NotFoundException(
        `Coach specialization with ID ${id} not found`,
      );
    }
    // Vérifier que le coach est autorisé à modifier sa spécialisation
    if (coachSpecialization.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this coach specialization",
      );
    }
    return this.coachSpecializationsRepository.save(coachSpecialization);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const coachSpecialization =
      await this.coachSpecializationsRepository.findOne({
        where: { id },
      });
    if (!coachSpecialization) {
      throw new NotFoundException(
        `Coach specialization with ID ${id} not found`,
      );
    }
    // Vérifier que le coach est autorisé à supprimer sa spécialisation
    if (coachSpecialization.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this coach specialization",
      );
    }
    await this.coachSpecializationsRepository.delete(id);
  }

  async searchCoachSpecializations(
    query: string,
  ): Promise<CoachSpecialization[]> {
    const coachSpecializations = await this.coachSpecializationsRepository.find(
      {
        where: [
          { coach: { user: { firstName: `%${query}%` } } },
          { coach: { user: { lastName: `%${query}%` } } },
          { coach: { user: { email: `%${query}%` } } },
          { specialization: `%${query}%` },
          { description: `%${query}%` },
        ],
        relations: ["coach"],
      },
    );
    return coachSpecializations;
  }

  async findByCoach(coachId: number): Promise<CoachSpecialization[]> {
    const coachSpecializations = await this.coachSpecializationsRepository.find(
      {
        where: { coach: { id: coachId } },
        relations: ["coach"],
      },
    );
    if (!coachSpecializations) {
      throw new NotFoundException(
        `Coach specializations for coach ${coachId} not found`,
      );
    }
    return coachSpecializations;
  }
}

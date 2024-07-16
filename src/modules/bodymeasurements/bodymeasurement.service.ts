import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBodyMeasurementDto } from "./dto/create-bodymeasurement.dto";
import { UpdateBodyMeasurementDto } from "./dto/update-bodymeasurement.dto";
import { BodyMeasurement } from "../../entities/body-measurement.entity";

@Injectable()
export class BodyMeasurementsService {
  constructor(
    @InjectRepository(BodyMeasurement)
    private bodyMeasurementsRepository: Repository<BodyMeasurement>,
  ) {}

  async create(
    createBodyMeasurementDto: CreateBodyMeasurementDto,
    userId: number,
  ): Promise<BodyMeasurement> {
    const bodyMeasurement = this.bodyMeasurementsRepository.create({
      ...createBodyMeasurementDto,
      user: { id: userId },
    });
    return this.bodyMeasurementsRepository.save(bodyMeasurement);
  }

  async findAll(): Promise<BodyMeasurement[]> {
    return this.bodyMeasurementsRepository.find({
      relations: ["user"],
    });
  }

  async findOne(id: number): Promise<BodyMeasurement> {
    const bodyMeasurement = await this.bodyMeasurementsRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!bodyMeasurement) {
      throw new NotFoundException(`Body measurement with ID ${id} not found`);
    }
    return bodyMeasurement;
  }

  async update(
    id: number,
    updateBodyMeasurementDto: UpdateBodyMeasurementDto,
    userId: number,
  ): Promise<BodyMeasurement> {
    const bodyMeasurement = await this.bodyMeasurementsRepository.preload({
      id,
      ...updateBodyMeasurementDto,
    });
    if (!bodyMeasurement) {
      throw new NotFoundException(`Body measurement with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier sa mesure corporelle
    if (bodyMeasurement.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this body measurement",
      );
    }
    return this.bodyMeasurementsRepository.save(bodyMeasurement);
  }

  async remove(id: number, userId: number): Promise<void> {
    const bodyMeasurement = await this.bodyMeasurementsRepository.findOne({
      where: { id },
    });
    if (!bodyMeasurement) {
      throw new NotFoundException(`Body measurement with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer sa mesure corporelle
    if (bodyMeasurement.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this body measurement",
      );
    }
    await this.bodyMeasurementsRepository.delete(id);
  }

  async searchBodyMeasurements(query: string): Promise<BodyMeasurement[]> {
    const bodyMeasurements = await this.bodyMeasurementsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
      ],
      relations: ["user"],
    });
    return bodyMeasurements;
  }

  async findByUser(userId: number): Promise<BodyMeasurement[]> {
    const bodyMeasurements = await this.bodyMeasurementsRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    if (!bodyMeasurements) {
      throw new NotFoundException(
        `Body measurements for user ${userId} not found`,
      );
    }
    return bodyMeasurements;
  }
}

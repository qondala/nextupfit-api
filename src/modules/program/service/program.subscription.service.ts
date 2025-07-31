import {
  Injectable
} from "@nestjs/common";
import {
  InjectRepository
} from "@nestjs/typeorm";
import {
  Repository
} from "typeorm";

import {
  PaginationOptionsDto
} from "@app/common/dto";
import {
  PaginatedResponseDto
} from "@app/common/dto";
import {
  BaseSubscriptionPlanStatusEnum
} from "@app/module/base/types";

import {
  ProgramSubscriptionEntity
} from "../entity";
import {
  CreateProgramSubscriptionDto,
  ProgramFindCriteriaSubscriptionDto,
  UpdateProgramSubscriptionDto,
} from "../dto";

@Injectable()
export class ProgramSubscriptionService {
  constructor(
    @InjectRepository(ProgramSubscriptionEntity)
    private readonly repository: Repository<ProgramSubscriptionEntity>
  ) {}

  async create(createProgramSubscriptionDto: CreateProgramSubscriptionDto): Promise<ProgramSubscriptionEntity> {
    const programSubscription = this.repository.create(createProgramSubscriptionDto);
    return await this.repository.save(programSubscription);
  }

  async findAll(criteria: ProgramFindCriteriaSubscriptionDto, pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramSubscriptionEntity>> {
    const queryBuilder = this.repository.createQueryBuilder("programSubscription");
    
    queryBuilder.where('programSubscription.id != 0');
    
    if (criteria.programId) {
      queryBuilder.andWhere('programSubscription.programId = :programId', { programId: criteria.programId });
    }
    
    if (criteria.subscriberUserId) {
      queryBuilder.andWhere('programSubscription.subscriberUserId = :subscriberUserId', { subscriberUserId: criteria.subscriberUserId });
    }
    
    if (criteria.programSubscriptionPlanId) {
      queryBuilder.andWhere('programSubscription.programSubscriptionPlanId = :programSubscriptionPlanId', { programSubscriptionPlanId: criteria.programSubscriptionPlanId });
    }
    
    if (criteria.status) {
      queryBuilder.andWhere('programSubscription.status = :status', { status: criteria.status });
    }
    
    queryBuilder.orderBy('programSubscription.createdAt', 'DESC');
    
    const { page, limit } = pagination || { page: 1, limit: 10 };
    const skip = (page - 1) * limit;

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
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

  async findByProgramId(programId: number): Promise<ProgramSubscriptionEntity[]> {
    return await this.repository.find({ where: { programId } });
  }

  async findBySubscriberUserId(subscriberUserId: number): Promise<ProgramSubscriptionEntity[]> {
    return await this.repository.find({ where: { subscriberUserId } });
  }

  async findByProgramSubscriptionPlanId(programSubscriptionPlanId: number): Promise<ProgramSubscriptionEntity[]> {
    return await this.repository.find({ where: { programSubscriptionPlanId } });
  }

  async findByUserIdAndProgramId(userId: number, programId: number): Promise<ProgramSubscriptionEntity[]> {
    return await this.repository.find({ where: { subscriberUserId: userId, programId } });
  }

  async findByUserIdAndSubscriptionPlanId(userId: number, programSubscriptionPlanId: number): Promise<ProgramSubscriptionEntity[]> {
    return await this.repository.find({ where: { subscriberUserId: userId, programSubscriptionPlanId } });
  }

  async findByStatus(status: BaseSubscriptionPlanStatusEnum): Promise<ProgramSubscriptionEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  async findOne(id: number): Promise<ProgramSubscriptionEntity> {
    const programSubscription = await this.repository.findOne({ where: { id } });
    if (!programSubscription) {
      throw new Error(`Program subscription with ID ${id} not found`);
    }
    return programSubscription;
  }

  async update(id: number, updateProgramSubscriptionDto: UpdateProgramSubscriptionDto): Promise<ProgramSubscriptionEntity> {
    const programSubscription = await this.findOne(id);
    Object.assign(programSubscription, updateProgramSubscriptionDto);
    return await this.repository.save(programSubscription);
  }

  async activate(id: number): Promise<void> {
    const programSubscription = await this.findOne(id);
    programSubscription.status = BaseSubscriptionPlanStatusEnum.active;
    await this.repository.save(programSubscription);
  }

  async deactivate(id: number): Promise<void> {
    const programSubscription = await this.findOne(id);
    programSubscription.status = BaseSubscriptionPlanStatusEnum.suspended;
    await this.repository.save(programSubscription);
  }

  async remove(id: number): Promise<void> {
    const programSubscription = await this.findOne(id);
    await this.repository.remove(programSubscription);
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SocialUpdateContentEntity } from "../entity/social.update-content.entity";
import { CreateSocialUpdateContentDto } from "../dto/create/create.social.update-content.dto";
import { UpdateSocialUpdateContentDto } from "../dto/update/update.social.update-content.dto";
import { PaginationOptionsDto, PaginatedResponseDto } from "@app/common/dto";

@Injectable()
export class SocialUpdateContentService {
  constructor(
    @InjectRepository(SocialUpdateContentEntity)
    private readonly socialUpdateContentRepository: Repository<SocialUpdateContentEntity>,
  ) {}

  async create(
    createDto: CreateSocialUpdateContentDto,
  ): Promise<SocialUpdateContentEntity> {
    const socialUpdateContent =
      this.socialUpdateContentRepository.create(createDto);
    return await this.socialUpdateContentRepository.save(socialUpdateContent);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateContentEntity>> {
    const queryBuilder = this.socialUpdateContentRepository
      .createQueryBuilder("socialUpdateContent")
      .leftJoinAndSelect("socialUpdateContent.socialUpdate", "socialUpdate")
      .leftJoinAndSelect("socialUpdate.authorUser", "authorUser")
      .leftJoinAndSelect("socialUpdate.authorManager", "authorManager")
      .orderBy("socialUpdateContent.id", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findBySocialUpdateId(
    socialUpdateId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateContentEntity>> {
    const queryBuilder = this.socialUpdateContentRepository
      .createQueryBuilder("socialUpdateContent")
      .leftJoinAndSelect("socialUpdateContent.socialUpdate", "socialUpdate")
      .leftJoinAndSelect("socialUpdate.authorUser", "authorUser")
      .leftJoinAndSelect("socialUpdate.authorManager", "authorManager")
      .where("socialUpdateContent.socialUpdateId = :socialUpdateId", {
        socialUpdateId,
      })
      .orderBy("socialUpdateContent.id", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findByContentId(
    contentId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateContentEntity>> {
    const queryBuilder = this.socialUpdateContentRepository
      .createQueryBuilder("socialUpdateContent")
      .leftJoinAndSelect("socialUpdateContent.socialUpdate", "socialUpdate")
      .leftJoinAndSelect("socialUpdate.authorUser", "authorUser")
      .leftJoinAndSelect("socialUpdate.authorManager", "authorManager")
      .where("socialUpdateContent.contentId = :contentId", { contentId })
      .orderBy("socialUpdateContent.id", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findBySocialUpdateIdAndContentId(
    socialUpdateId: number,
    contentId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateContentEntity>> {
    const queryBuilder = this.socialUpdateContentRepository
      .createQueryBuilder("socialUpdateContent")
      .leftJoinAndSelect("socialUpdateContent.socialUpdate", "socialUpdate")
      .leftJoinAndSelect("socialUpdate.authorUser", "authorUser")
      .leftJoinAndSelect("socialUpdate.authorManager", "authorManager")
      .where("socialUpdateContent.socialUpdateId = :socialUpdateId", {
        socialUpdateId,
      })
      .andWhere("socialUpdateContent.contentId = :contentId", { contentId })
      .orderBy("socialUpdateContent.id", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findOne(id: number): Promise<SocialUpdateContentEntity | null> {
    return await this.socialUpdateContentRepository.findOne({
      where: { id },
      relations: [
        "socialUpdate",
        "socialUpdate.authorUser",
        "socialUpdate.authorManager",
      ],
    });
  }

  async update(
    id: number,
    updateDto: UpdateSocialUpdateContentDto,
  ): Promise<SocialUpdateContentEntity | null> {
    await this.socialUpdateContentRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.socialUpdateContentRepository.delete(id);
  }
}

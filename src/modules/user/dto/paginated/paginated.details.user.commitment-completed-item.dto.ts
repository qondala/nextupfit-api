import { ApiExtraModels } from "@nestjs/swagger";
import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsUserCommitmentCompletedItemDto } from "../details/details.user.commitment-completed-item.dto";

@ApiExtraModels(DetailsUserCommitmentCompletedItemDto)
export class PaginatedDetailsUserCommitmentCompletedItemDto extends PaginatedResponseDto<DetailsUserCommitmentCompletedItemDto> {}

import { FilterDto } from "../../shared/dtos/filter.dto";
import { Vote } from "../../shared/enums/vote.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class FilterVoteDto extends FilterDto {
  @ApiProperty()
  @IsEnum(Vote)
  @IsOptional()
  vote: Vote

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  postId: number;
}

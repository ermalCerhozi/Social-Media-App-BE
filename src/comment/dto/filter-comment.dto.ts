import { FilterDto } from '../../shared/dtos/filter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterCommentDto extends FilterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

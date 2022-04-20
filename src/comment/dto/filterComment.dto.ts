import { FilterDto } from '../../shared/dtos/filter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterCommentDto extends FilterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;
}

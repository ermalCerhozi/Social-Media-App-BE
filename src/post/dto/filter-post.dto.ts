import { FilterDto } from '../../shared/dtos/filter.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterPostDto extends FilterDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

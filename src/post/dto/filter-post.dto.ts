import { FilterDto } from '../../shared/dtos/filter.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterPostDto extends FilterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}

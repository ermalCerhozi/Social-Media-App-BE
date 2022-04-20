import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsOptional()
  pageNo?: number;

  @ApiProperty()
  @IsNumber()
  @Max(25)
  @IsOptional()
  pageSize?: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class PageOfDto<MODEL> {
  @ApiProperty()
  list: MODEL[];

  @ApiProperty()
  pageNo: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalElements: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<MODEL> {
  @ApiProperty()
  data: MODEL;

  @ApiProperty()
  result: any;
}

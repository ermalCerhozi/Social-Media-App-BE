import { ApiProperty } from '@nestjs/swagger';

export class ResponseModel<MODEL> {
  private data: MODEL;

  @ApiProperty()
  private result: null;

  constructor(data: MODEL) {
    this.data = data;
    this.result = null;
  }
}

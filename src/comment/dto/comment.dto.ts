import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  user: string;
}

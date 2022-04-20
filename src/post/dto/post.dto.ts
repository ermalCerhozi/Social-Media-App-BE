import { CommentDto } from '../../comment/dto/comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  noComment: boolean;

  @ApiProperty()
  comments?: CommentDto[];
}

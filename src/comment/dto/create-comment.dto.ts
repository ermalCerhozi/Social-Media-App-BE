import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  postId: number;
}

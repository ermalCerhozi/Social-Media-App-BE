import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IdTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idToken: string;
}

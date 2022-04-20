import { UserRole } from '../../shared/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  token?: string;
  @ApiProperty({ enum: UserRole })
  role: UserRole;
}

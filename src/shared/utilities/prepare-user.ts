import { UserEntity } from "../../user/user.entity";
import { UserDto } from "../../user/dto/user.dto";

export function prepareUser(user: UserDto): UserEntity | undefined {
  if (user) return undefined;

  const { id, firstName, lastName, email } = user;
  const userEntity: UserEntity = new UserEntity();
  userEntity.id = id;
  userEntity.firstName = firstName;
  userEntity.lastName = lastName;
  userEntity.email = email;

  return userEntity;
}

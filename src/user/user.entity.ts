import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from '../shared/enums/user-role.enum';

import * as bcrypt from 'bcrypt';

export const UNIQUE_USER_EMAIL = 'unique_user_email_constraint';

@Entity('user')
@Unique(UNIQUE_USER_EMAIL, ['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  readonly firstName: string;

  @Column()
  readonly lastName: string;

  @Column()
  readonly email: string;

  @Column({ nullable: true })
  private password: string;

  @Column({ nullable: true })
  private passwordSalt: string;

  @Column()
  readonly role: UserRole;

  constructor();
  constructor(firstName: string);
  constructor(firstName: string, lastName: string);
  constructor(firstName: string, lastName: string, email: string);
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  );
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    role: UserRole,
  );
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRole,
  );
  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    passwordOrRole?: string | UserRole,
    role?: UserRole,
  ) {
    super();

    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (email) this.email = email;

    if (passwordOrRole) {
      if (typeof passwordOrRole === 'string') {
        this.setPassword(passwordOrRole);
      } else {
        this.role = passwordOrRole;
      }
    }

    if (role) this.role = role;
  }

  async setPassword(password: string): Promise<UserEntity> {
    this.passwordSalt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, this.passwordSalt);

    return this;
  }

  async validatePassword(password: string): Promise<boolean> {
    if (this.passwordSalt && this.password) {
      const hashPassword: string = await bcrypt.hash(
        password,
        this.passwordSalt,
      );

      if (hashPassword === this.password) {
        return Promise.resolve(true);
      }

      return Promise.reject();
    }

    return Promise.reject();
  }
}

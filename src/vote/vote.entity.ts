import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from '../shared/enums/vote.enum';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';

@Entity('vote')
export class VoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vote: Vote;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.votes)
  post: PostEntity;
}

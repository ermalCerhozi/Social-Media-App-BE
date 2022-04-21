import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';
import { VoteEntity } from '../vote/vote.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('post')
export class PostEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  imageUrl: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  noComment: boolean;

  @ApiProperty({ type: () => [CommentEntity] })
  @OneToMany(() => CommentEntity, (comment) => comment.post, { nullable: true })
  comments: CommentEntity[];

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ApiProperty({ type: () => [VoteEntity] })
  @OneToMany(() => VoteEntity, (vote) => vote.post, { nullable: true })
  votes: VoteEntity[];
}

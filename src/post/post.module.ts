import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { CommentModule } from '../comment/comment.module';
import { VoteModule } from '../vote/vote.module';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    CommentModule,
    VoteModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

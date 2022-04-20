import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteRepository } from './vote.repository';
import { VoteController } from './vote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VoteRepository])],
  controllers: [VoteController],
  providers: [VoteController],
  exports: [VoteController],
})
export class VoteModule {}

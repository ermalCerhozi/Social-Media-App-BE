import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteRepository } from './vote.repository';
import { VoteController } from './vote.controller';
import { VoteService } from "./vote.service";

@Module({
  imports: [TypeOrmModule.forFeature([VoteRepository])],
  controllers: [VoteController],
  providers: [VoteController, VoteService],
  exports: [VoteController],
})
export class VoteModule {}

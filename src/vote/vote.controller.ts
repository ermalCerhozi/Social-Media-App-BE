import { Controller, Get, HttpCode, Injectable, Post } from '@nestjs/common';

@Injectable()
@Controller('vote')
export class VoteController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getList(): Promise<void> {}

  @Post('upVote')
  @HttpCode(200)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async upVote(): Promise<void> {}

  @Post('downVote')
  @HttpCode(200)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async downVote(): Promise<void> {}
}

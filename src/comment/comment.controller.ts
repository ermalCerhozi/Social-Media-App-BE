import {
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Injectable()
@Controller('comment')
export class CommentController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getList(): Promise<void> {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async add(): Promise<void> {}

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {}
}

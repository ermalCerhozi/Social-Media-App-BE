import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentController } from '../comment/comment.controller';
import { FilterPostDto } from './dto/filter-post.dto';
import { PostService } from './post.service';
import { ResponseDto } from "../shared/dtos/response.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { PostEntity } from "./post.entity";

@Controller('post')
export class PostController {
  constructor(
    private readonly commentController: CommentController,
    private readonly postService: PostService,
  ) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getList(
    @Query() filterPostDto: FilterPostDto,
  ): Promise<ResponseDto<PageOfDto<PostEntity>>> {
    const pageOfPosts: PageOfDto<PostEntity> = await this.postService.getList(
      filterPostDto,
    );

    return {
      data: pageOfPosts,
      result: null,
    };
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async get(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async add(): Promise<void> {}

  @Put(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async update(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Get(':id/comment')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async getCommentList(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Post(':id/comment')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async addComment(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Delete(':id/comment/:commentId')
  async removeComment(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id', ParseIntPipe) id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('commentId', ParseIntPipe) commentId: number,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): Promise<void> {}
}

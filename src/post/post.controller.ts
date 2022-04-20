import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import { CommentController } from "../comment/comment.controller";
import { FilterPostDto } from "./dto/filter-post.dto";
import { PostService } from "./post.service";
import { ResponseDto } from "../shared/dtos/response.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { PostEntity } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { EditPostDto } from "./dto/edit-post.dto";
import { RoleGuard } from "../shared/guards/role.guard";
import { UserRole } from "../shared/enums/user-role.enum";

@Controller('post')
export class PostController {
  constructor(
    private readonly commentController: CommentController,
    private readonly postService: PostService,
  ) {}

  @Get()
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
  async get(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<PostEntity>> {
    const post: PostEntity = await this.postService.get(id);

    return {
      data: post,
      result: null
    };
  }

  @Post()
  @UseGuards(new RoleGuard(UserRole.USER))
  async add(
    @Body() createPostDto: CreatePostDto
  ): Promise<ResponseDto<PostEntity>> {
    const newPost: PostEntity = await this.postService.create(createPostDto);

    return {
      data: newPost,
      result: null
    };
  }

  @Put(':id')
  @UseGuards(new RoleGuard(UserRole.USER))
  async update(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body() editPostDto: EditPostDto
  ): Promise<ResponseDto<PostEntity>> {
    if (id !== editPostDto.id) throw new ConflictException();

    const post: PostEntity = await this.postService.update(id, editPostDto);

    return {
      data: post,
      result: null
    }
  }

  @Get(':id/comment')
  async getCommentList(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Post(':id/comment')
  async addComment(@Param('id', ParseIntPipe) id: number): Promise<void> {}

  @Delete(':id/comment/:commentId')
  async removeComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {}
}

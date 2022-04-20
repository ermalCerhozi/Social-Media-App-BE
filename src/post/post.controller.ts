import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Headers,
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
import { UserDto } from "../user/dto/user.dto";
import { LoggedUser } from "../user/logged-users";
import { FilterCommentDto } from "../comment/dto/filter-comment.dto";
import { CommentEntity } from "../comment/comment.entity";
import { CreateCommentDto } from "../comment/dto/create-comment.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Post')
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
    @Headers('authorization') token: string,
    @Body() createPostDto: CreatePostDto
  ): Promise<ResponseDto<PostEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const newPost: PostEntity = await this.postService.create(createPostDto, user);

    return {
      data: newPost,
      result: null
    };
  }

  @Put(':id')
  @UseGuards(new RoleGuard(UserRole.USER))
  async update(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() editPostDto: EditPostDto
  ): Promise<ResponseDto<PostEntity>> {
    if (id !== editPostDto.id) throw new ConflictException();

    const user: UserDto = LoggedUser.getUser(token);

    const post: PostEntity = await this.postService.update(id, editPostDto, user.id);

    return {
      data: post,
      result: null
    }
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(UserRole.USER))
  async remove(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<PostEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const post: PostEntity = await this.postService.delete(id, user.id);

    return {
      data: post,
      result: null
    };
  }

  @Get(':id/comment')
  async getCommentList(
    @Param('id', ParseIntPipe) id: number,
    @Query() filterCommentDto: Omit<FilterCommentDto, 'postId'>
  ): Promise<ResponseDto<PageOfDto<CommentEntity>>> {
    const post: PostEntity = await this.postService.get(id);

    return await this.commentController.getList({
      ...filterCommentDto,
      postId: post.id
    });
  }

  @Post(':id/comment')
  @UseGuards(new RoleGuard(UserRole.USER))
  async addComment(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: Omit<CreateCommentDto, 'postId'>
  ): Promise<ResponseDto<CommentEntity>> {
    const post: PostEntity = await this.postService.get(id);

    return await this.commentController.add(token, {
      ...createCommentDto,
      postId: post.id
    });
  }

  @Delete(':id/comment/:commentId')
  @UseGuards(new RoleGuard(UserRole.USER))
  async removeComment(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<ResponseDto<CommentEntity>> {
    await this.postService.get(id);
    return await this.commentController.remove(token, commentId);
  }
}

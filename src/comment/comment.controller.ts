import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { FilterCommentDto } from "./dto/filter-comment.dto";
import { ResponseDto } from "../shared/dtos/response.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { CommentEntity } from "./comment.entity";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { RoleGuard } from "../shared/guards/role.guard";
import { UserRole } from "../shared/enums/user-role.enum";
import { UserDto } from "../user/dto/user.dto";
import { LoggedUser } from "../user/logged-users";
import { ApiTags } from "@nestjs/swagger";

@Injectable()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getList(
    @Query() filterCommentDto: FilterCommentDto
  ): Promise<ResponseDto<PageOfDto<CommentEntity>>> {
    const pageOfComments: PageOfDto<CommentEntity> = await this.commentService
      .getList(filterCommentDto);

    return {
      data: pageOfComments,
      result: null
    }
  }

  @Post()
  @UseGuards(new RoleGuard(UserRole.USER))
  async add(
    @Headers('authorization') token: string,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<ResponseDto<CommentEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const newComment: CommentEntity = await this.commentService
      .create(createCommentDto, user);

    return {
      data: newComment,
      result: null
    }
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(UserRole.USER))
  async remove(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<CommentEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const comment: CommentEntity = await this.commentService.delete(id, user.id);

    return {
      data: comment,
      result: null
    };
  }
}

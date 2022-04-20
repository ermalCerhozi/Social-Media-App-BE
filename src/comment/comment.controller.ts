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

@Injectable()
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

    const { id } = user;
    const newComment: CommentEntity = await this.commentService
      .create(createCommentDto,id);

    return {
      data: newComment,
      result: null
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<CommentEntity>> {
    const comment: CommentEntity = await this.commentService.delete(id);

    return {
      data: comment,
      result: null
    };
  }
}

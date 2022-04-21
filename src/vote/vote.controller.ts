import { Controller, Get, Headers, Injectable, ParseIntPipe, Patch, Query } from "@nestjs/common";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "../shared/dtos/response.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { VoteEntity } from "./vote.entity";
import { VoteService } from "./vote.service";
import { FilterVoteDto } from "./dto/filter-vote.dto";
import { ApiCustomPaginatedResponse } from "../shared/decorators/api-custom-paginated-response";
import { UserDto } from "../user/dto/user.dto";
import { LoggedUser } from "../user/logged-users";
import { Vote } from "../shared/enums/vote.enum";
import { ApiCustomResponse } from "../shared/decorators/api-custom-response";

@Injectable()
@ApiTags('Vote')
@Controller('vote')
@ApiExtraModels(ResponseDto, PageOfDto, VoteEntity)
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  @ApiCustomPaginatedResponse(VoteEntity)
  async getList(
    @Query() filterVoteDto: FilterVoteDto
  ): Promise<ResponseDto<PageOfDto<VoteEntity>>> {
    const pageOfVotes: PageOfDto<VoteEntity> = await this.voteService.getList(filterVoteDto);

    return {
      data: pageOfVotes,
      result: null
    }
  }

  @Patch('upVote')
  @ApiCustomResponse(VoteEntity)
  async upVote(
    @Headers('authorization') token: string,
    @Query('postId', ParseIntPipe) postId: number
  ): Promise<ResponseDto<VoteEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const vote: VoteEntity = await this.voteService.vote(Vote.UP, user, postId);

    return {
      data: vote,
      result: null
    };
  }

  @Patch('downVote')
  @ApiCustomResponse(VoteEntity)
  async downVote(
    @Headers('authorization') token: string,
    @Query('postId', ParseIntPipe) postId: number
  ): Promise<ResponseDto<VoteEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const vote: VoteEntity = await this.voteService.vote(Vote.DOWN, user, postId);

    return {
      data: vote,
      result: null
    };
  }
}

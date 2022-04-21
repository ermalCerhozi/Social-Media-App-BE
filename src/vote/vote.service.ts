import { InjectRepository } from "@nestjs/typeorm";
import { VoteFilter, VoteRepository } from "./vote.repository";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FilterVoteDto } from "./dto/filter-vote.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { VoteEntity } from "./vote.entity";
import { extractPagination } from "../shared/utilities/extract-pagination";
import { Vote } from "../shared/enums/vote.enum";
import { UserDto } from "../user/dto/user.dto";
import { UserEntity } from "../user/user.entity";
import { prepareUser } from "../shared/utilities/prepare-user";
import { PostEntity } from "../post/post.entity";

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteRepository)
    private readonly voteRepository: VoteRepository
  ) {}

  async getList(filterVoteDto: FilterVoteDto): Promise<PageOfDto<VoteEntity>> {
    const { skip, take, pageNo, pageSize, vote, postId } = extractPagination(filterVoteDto);

    let voteList: VoteEntity[];
    let totalElements = 0;

    let options: VoteFilter = { skip, take, postId };

    if (vote) {
      options = {
        ...options,
        vote
      };
    }

    try {
      const [votes, voteCount] = await this.voteRepository.findAndCount(options);
      voteList = votes;
      totalElements = voteCount;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return {
      list: voteList,
      pageNo,
      pageSize,
      totalElements
    };
  }

  async vote(vote: Vote, userDto: UserDto, postId: number): Promise<VoteEntity> {
    let voteEntity: VoteEntity;
    const user: UserEntity = prepareUser(userDto);

    const createVoteEntity = (): void => {
      voteEntity = new VoteEntity();
      voteEntity.user = user;

      const post: PostEntity = new PostEntity();
      post.id = postId;
      voteEntity.post = post;
    };

    try {
      voteEntity = await this.voteRepository.findOne(user);

      if (!voteEntity) createVoteEntity();
    } catch (ex) {
      createVoteEntity();
    }

    voteEntity.vote = vote;

    try {
      await voteEntity.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return voteEntity;
  }
}

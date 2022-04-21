import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { VoteEntity } from './vote.entity';
import { PaginateModel } from "../shared/models/paginate.model";
import { Vote } from "../shared/enums/vote.enum";
import { UserEntity } from "../user/user.entity";

export interface VoteFilter extends PaginateModel {
  vote?: Vote;
  postId: number;
}

@EntityRepository(VoteEntity)
export class VoteRepository extends Repository<VoteEntity> {
  private async getVoteAndSubEntities(): Promise<SelectQueryBuilder<VoteEntity>> {
    return this.createQueryBuilder('vote')
      .select([
        'vote.id',
        'vote.vote',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email'
      ])
      .leftJoin('vote.user', 'user');
  }

  async findAndCount(options: VoteFilter): Promise<[VoteEntity[], number]> {
    const qb: SelectQueryBuilder<VoteEntity> = await this.getVoteAndSubEntities();
    const { skip, take, vote, postId } = options;
    qb.skip(skip);
    qb.take(take);

    qb.where({ postId });

    if (vote) {
      qb.andWhere({ vote });
    }

    return qb.getManyAndCount();
  }

  // @ts-ignore
  async findOne(user: UserEntity, postId?: number): Promise<VoteEntity | undefined> {
    const qb: SelectQueryBuilder<VoteEntity> = await this.getVoteAndSubEntities();
    qb.where('"user"."id" = :userId', { userId: user.id });

    return qb.getOne();
  }
}

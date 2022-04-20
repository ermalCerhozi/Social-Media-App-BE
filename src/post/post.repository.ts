import { EntityRepository, Like, Repository, SelectQueryBuilder } from "typeorm";
import { PostEntity } from './post.entity';
import { PaginateModel } from "../shared/models/paginate.model";

export interface PostFilter extends PaginateModel {
  description?: string;
}

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  private async getPostAndSubEntities(): Promise<SelectQueryBuilder<PostEntity>> {
    return this.createQueryBuilder('post')
      .select([
        'post.id',
        'post.imageUrl',
        'post.description',
        'post.noComment',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'comments.id',
        'comments.comment',
        'commentUser.id',
        'commentUser.firstName',
        'commentUser.lastName',
        'commentUser.email'
      ])
      .leftJoin('post.user', 'user')
      .leftJoin('post.comments', 'comments')
      .leftJoin('comments.user', 'commentUser')
  }

  // @ts-ignore
  async findAndCount(
    options: PostFilter,
  ): Promise<[PostEntity[], number]> {
    const qb: SelectQueryBuilder<PostEntity> = await this.getPostAndSubEntities();

    const { skip, take, description } = options;
    qb.skip(skip);
    qb.take(take);

    if (description) {
      qb.where({
        description: Like(`%${description}%`)
      });
    }

    return qb.getManyAndCount();
  }

  // @ts-ignore
  async findOne(id: number): Promise<PostEntity | undefined> {
    const qb: SelectQueryBuilder<PostEntity> = await this.getPostAndSubEntities();
    qb.where({ id });

    return qb.getOne();
  }
}

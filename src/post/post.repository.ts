import { EntityRepository, FindManyOptions, Repository } from "typeorm";
import { PostEntity } from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  // @ts-ignore
  async findAndCount(
    options?: FindManyOptions<PostEntity>,
  ): Promise<[PostEntity[], number]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.user', 'user')
      .getManyAndCount();
  }
}

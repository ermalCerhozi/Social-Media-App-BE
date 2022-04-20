import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { FilterPostDto } from './dto/filter-post.dto';
import { environment } from '../environment/environment';
import { PageOfDto } from '../shared/dtos/page-of.dto';
import { PostEntity } from './post.entity';
import { FindManyOptions, Like } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async getList(filterPostDto?: FilterPostDto): Promise<PageOfDto<PostEntity>> {
    const pageNo: number = filterPostDto?.pageNo || 1;
    const pageSize: number = filterPostDto?.pageSize || environment.pageSize;

    const skip: number = pageNo * pageSize;
    const take: number = pageSize;

    let postList: PostEntity[];
    let totalElements = 0;

    let options: FindManyOptions<PostEntity> = { skip, take };

    if (filterPostDto?.description) {
      const { description } = filterPostDto;

      options = {
        ...options,
        where: {
          description: Like(description),
        },
      };
    }

    try {
      const [posts, postCount] = await this.postRepository.findAndCount(
        options,
      );

      postList = posts;
      totalElements = postCount;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return {
      list: postList,
      pageNo,
      pageSize,
      totalElements,
    };
  }
}

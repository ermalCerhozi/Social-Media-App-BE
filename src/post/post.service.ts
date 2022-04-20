import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PostFilter, PostRepository } from "./post.repository";
import { FilterPostDto } from './dto/filter-post.dto';
import { environment } from '../environment/environment';
import { PageOfDto } from '../shared/dtos/page-of.dto';
import { PostEntity } from './post.entity';
import { CreatePostDto } from "./dto/create-post.dto";
import { EditPostDto } from "./dto/edit-post.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async getList(filterPostDto?: FilterPostDto): Promise<PageOfDto<PostEntity>> {
    const pageNo: number = filterPostDto?.pageNo || 1;
    const pageSize: number = filterPostDto?.pageSize || environment.pageSize;

    const skip: number = (pageNo - 1) * pageSize;
    const take: number = pageSize;

    let postList: PostEntity[];
    let totalElements = 0;

    let options: PostFilter = { skip, take };

    if (filterPostDto.description) {
      options = {
        ...options,
        description: filterPostDto.description
      };
    }

    try {
      const [posts, postCount] = await this.postRepository.findAndCount(
        options
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

  async get(id: number): Promise<PostEntity> {
    let post: PostEntity;

    try {
      post = await this.postRepository.findOne(id);
    } catch (ex) {
      throw new NotFoundException(ex);
    }

    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const newPost: PostEntity = new PostEntity();
    const { imageUrl, description, noComment } = createPostDto;

    newPost.imageUrl = imageUrl;
    newPost.description = description;
    newPost.noComment = noComment || false;

    try {
      await newPost.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return newPost;
  }

  async update(id: number, editPostDto: EditPostDto): Promise<PostEntity> {
    const post: PostEntity = await this.get(id);

    const { description, noComment } = editPostDto;
    post.description = description;
    if (noComment !== undefined) post.noComment = noComment;

    try {
      await post.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return post;
  }
}

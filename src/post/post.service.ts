import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PostFilter, PostRepository } from "./post.repository";
import { FilterPostDto } from './dto/filter-post.dto';
import { PageOfDto } from '../shared/dtos/page-of.dto';
import { PostEntity } from './post.entity';
import { CreatePostDto } from "./dto/create-post.dto";
import { EditPostDto } from "./dto/edit-post.dto";
import { extractPagination } from "../shared/utilities/extract-pagination";
import { UserEntity } from "../user/user.entity";
import { UserDto } from "../user/dto/user.dto";
import { prepareUser } from "../shared/utilities/prepare-user";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async getList(filterPostDto?: FilterPostDto): Promise<PageOfDto<PostEntity>> {
    const { skip, take, pageNo, pageSize } = extractPagination(filterPostDto);

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
    try {
      return  await this.postRepository.findOne(id);
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }

  async create(createPostDto: CreatePostDto, userDto: UserDto): Promise<PostEntity> {
    const newPost: PostEntity = new PostEntity();
    const user: UserEntity = prepareUser(userDto);
    const { imageUrl, description, noComment } = createPostDto;

    newPost.imageUrl = imageUrl;
    newPost.description = description;
    newPost.noComment = noComment || false;
    newPost.user = user;

    try {
      await newPost.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return newPost;
  }

  async update(id: number, editPostDto: EditPostDto, userId: number): Promise<PostEntity> {
    const post: PostEntity = await this.get(id);

    if (post.user.id !== userId) throw new ConflictException({
      data: null,
      result: 'You can not modify a post made by someone else!'
    });

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

  async delete(id: number, userId: number): Promise<PostEntity> {
    const foundPost: PostEntity = await this.get(id);

    if (foundPost.user.id !== userId) throw new ConflictException({
      data: null,
      result: 'You can not delete post made by someone else!'
    });

    try {
      await this.postRepository.remove(foundPost);
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return foundPost;
  }
}

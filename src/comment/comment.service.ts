import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentFilter, CommentRepository } from "./comment.repository";
import { FilterCommentDto } from "./dto/filter-comment.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { CommentEntity } from "./comment.entity";
import { extractPagination } from "../shared/utilities/extract-pagination";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserDto } from "../user/dto/user.dto";
import { UserEntity } from "../user/user.entity";
import { prepareUser } from "../shared/utilities/prepare-user";
import { PostEntity } from "../post/post.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository
  ) {}

  async getList(filterCommentDto: FilterCommentDto): Promise<PageOfDto<CommentEntity>> {
    const {
      skip,
      take,
      pageNo,
      pageSize,
      comment,
      postId
    } = extractPagination(filterCommentDto);

    let commentList: CommentEntity[];
    let totalElements = 0;

    let options: CommentFilter = { skip, take, postId };

    if (comment) {
      options = {
        ...options,
        comment
      };
    }

    try {
      const [comments, commentCount] = await this.commentRepository.findAndCount(options);
      commentList = comments;
      totalElements = commentCount;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return {
      list: commentList,
      pageNo,
      pageSize,
      totalElements
    }
  }

  async create(createCommentDto: CreateCommentDto, userDto: UserDto): Promise<CommentEntity> {
    const newComment: CommentEntity = new CommentEntity();

    const { comment, postId } = createCommentDto;
    newComment.comment = comment;

    const user: UserEntity = prepareUser(userDto);
    const post: PostEntity = new PostEntity();
    post.id = postId;

    newComment.user = user;
    newComment.post = post;

    try {
      await newComment.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return newComment;
  }

  async delete(id: number, userId: number): Promise<CommentEntity> {
    const foundComment: CommentEntity = await this.commentRepository.findOne(id);

    if (foundComment.user.id !== userId) throw new ConflictException({
      data: null,
      result: 'You can not delete comment made by someone else!'
    });

    try {
      await this.commentRepository.remove(foundComment);
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return foundComment;
  }
}

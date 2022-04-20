import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentFilter, CommentRepository } from "./comment.repository";
import { FilterCommentDto } from "./dto/filter-comment.dto";
import { PageOfDto } from "../shared/dtos/page-of.dto";
import { CommentEntity } from "./comment.entity";
import { extractPagination } from "../shared/utilities/extract-pagination";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository
  ) {}

  async getList(filterCommentDto: FilterCommentDto): Promise<PageOfDto<CommentEntity>> {
    const { skip, take, pageNo, pageSize, comment, userId } = extractPagination(filterCommentDto);

    let commentList: CommentEntity[];
    let totalElements = 0;

    let options: CommentFilter = { skip, take, userId };

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

  async create(createCommentDto: CreateCommentDto, userId: number): Promise<CommentEntity> {
    const newComment: CommentEntity = new CommentEntity();

    const { comment } = createCommentDto;
    newComment.comment = comment;

    try {
      await newComment.save({ data: { userId } });
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return newComment;
  }

  async delete(id: number): Promise<CommentEntity> {
    const foundComment: CommentEntity = await this.commentRepository.findOne(id);

    try {
      await this.commentRepository.remove(foundComment);
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return foundComment;
  }
}

import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { CommentRating } from '../../shared/types/index.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
  calculateAvgRating(offerId: string): Promise<CommentRating>;
}

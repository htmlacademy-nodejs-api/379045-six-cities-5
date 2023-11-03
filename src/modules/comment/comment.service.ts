import { inject, injectable } from 'inversify';
import { CommentService as CommentServiceInterface } from './comment-service.interface.js';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CommentRating, Component, SortType } from '../../shared/types/index.js';
import { CreateCommentDto } from './dto/comment.dto.js';
import { MAX_COMMENTS_COUNT } from './comment.const.js';

@injectable()
export class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .limit(MAX_COMMENTS_COUNT)
      .sort({ createdAt: SortType.Down })
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }

  public async calculateAvgRating(offerId: string): Promise<CommentRating> {
    const objectOffer = new mongoose.Types.ObjectId(offerId);
    const [avgRating]: CommentRating[] = await this.commentModel.aggregate([
      { $match: { offerId: objectOffer } },
      {
        $group: {
          _id: '$offerId',
          avgRating: { $avg: '$rating' },
        }
      },
      {
        $project: {
          rating: { $round: ['$avgRating', 1] },
        }
      },
      { $unset: '_id' }
    ]);

    return avgRating;
  }
}

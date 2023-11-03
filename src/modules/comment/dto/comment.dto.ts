import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.required.msg })
  @Length(5, 1024, { message: CreateCommentMessages.text.length.msg })
  public text: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.id.msg })
  public offerId: string;

  public userId: string;

  @IsNumber({}, { message: CreateCommentMessages.rating.int.msg })
  @Min(1, { message: CreateCommentMessages.rating.min.msg })
  @Max(5, { message: CreateCommentMessages.rating.max.msg })
  public rating: number;
}

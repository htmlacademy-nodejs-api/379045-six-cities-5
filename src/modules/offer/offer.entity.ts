import { defaultClasses, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CiryCoords, OfferType } from '../../shared/types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public city!: string;

  @prop()
  public preview!: string;

  @prop()
  public photos!: string[];

  @prop({ default: false })
  public premium!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
  })
  public type!: OfferType;

  @prop()
  public roomsCount!: number;

  @prop()
  public guestsCount!: number;

  @prop()
  public price!: number;

  @prop()
  public comforts!: string[];

  @prop({ default: 0 })
  public commentCount!: number;

  @prop()
  public coords!: CiryCoords;

  @prop({ ref: () => UserEntity, required: true })
  public userId!: Ref<UserEntity>;
}

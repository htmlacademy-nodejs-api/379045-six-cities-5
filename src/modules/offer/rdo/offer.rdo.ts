import { Expose, Type } from 'class-transformer';
import { CiryCoords } from '../../../shared/types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public price: string;

  @Expose()
  public type: string;

  @Expose({ name: 'createdAt' })
  @Type(() => Date)
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public comforts: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public coords: CiryCoords;

  @Expose()
  public commentsCount: number;

  @Expose()
  public guestsCount: number;

  @Expose()
  public roomsCount: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}

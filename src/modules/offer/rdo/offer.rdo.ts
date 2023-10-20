import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public price: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public type: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public premium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;
}

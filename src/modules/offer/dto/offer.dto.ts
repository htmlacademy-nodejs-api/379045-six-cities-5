import { OfferType, CiryCoords } from '../../../shared/types/index.js';

export class CreateOfferDto {
  public userId: string;
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public preview: string;
  public photos: string[];
  public premium: boolean;
  public favored: boolean;
  public rating: number;
  public type: OfferType;
  public roomsCount: number;
  public guestsCount: number;
  public price: string;
  public comforts: string[];
  public commentsCount: number;
  public coords: CiryCoords;
}

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public preview?: string;
  public type?: OfferType;
  public price?: number;
  public comforts?: string[];
}

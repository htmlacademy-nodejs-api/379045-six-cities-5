import { CiryCoords, CityName } from './cities.js';
import { User } from './user.js';

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityName;
  preview: string;
  photos: string[];
  premium: boolean;
  rating: number;
  type: OfferType;
  roomsCount: number; // 1-8
  guestsCount: number; // 1-10
  price: string; // 100-100 000;
  comforts: string[];
  author: User;
  commentsCount: number;
  coords: CiryCoords;
}

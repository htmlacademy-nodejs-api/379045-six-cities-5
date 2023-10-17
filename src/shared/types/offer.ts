import { CiryCoords } from './cities.js';
import { User } from './user.js';

export type OfferType = 'apartment' | 'house' | 'room' | 'hotel';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
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

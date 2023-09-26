import { User } from './user.js';

export type Comment = {
  text: string;
  postDate: Date;
  rating: number;
  author: User;
}

import { User } from './user.js';

export type CommentRating = {
  rating: number;
};

export type Comment = {
  text: string;
  postDate: Date;
  rating: CommentRating;
  author: User;
}

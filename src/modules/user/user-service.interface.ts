import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/user.dto.js';
import { OfferEntity } from '../offer/index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  changeFavorites(userId: string, offerId: string, value: boolean): Promise<DocumentType<UserEntity> | null>;
}

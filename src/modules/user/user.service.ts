import { UserService as UserServiceInterface } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../shared/types/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto.js';
import { UserEntity } from './user.entity.js';
import { OfferEntity } from '../offer/index.js';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) { }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.userModel
      .findById(userId, { favorites: true, _id: false })
      .populate<{ favorites: DocumentType<OfferEntity>[] }>('favorites')
      .sort({ createdAt: SortType.Down })
      .orFail()
      .exec()
      .then(({ favorites }) => favorites);

  }

  public async changeFavorites(userId: string, offerId: string, value: boolean): Promise<DocumentType<UserEntity> | null> {
    // @TODO добавить проверку на дубликаты
    return this.userModel
      .findByIdAndUpdate(userId, { [`${value ? '$push' : '$pull'}`]: { favorites: offerId } }, { new: true }).exec();
  }
}

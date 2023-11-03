import { defaultClasses, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User, UserType } from '../../shared/types/index.js';
import { createSHA256 } from '../../shared/helpers/index.js';
import { OfferEntity } from '../offer/offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true, default: 'standard' })
  public type: UserType;

  @prop({ required: true, default: '' })
  private password?: string;

  @prop({
    ref: () => OfferEntity,
    type: () => [String],
    _id: false,
    required: true,
    default: []
  })
  public favorites: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

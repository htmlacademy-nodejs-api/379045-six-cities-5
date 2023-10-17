import { UserType } from '../../../shared/types/user.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatar: string;
  public type: UserType;
  public password: string;
}

export class UpdateUserDto {
  public avatar?: string;
  public name?: string;
  public favorites?: string[];
}

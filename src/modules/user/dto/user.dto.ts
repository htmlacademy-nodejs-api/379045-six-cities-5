import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserType, userTypes } from '../../../shared/types/user.js';
import { UserMessages } from './validate-messages.js';

export class CreateUserDto {
  @IsString({ message: UserMessages.name.required.msg })
  @Length(1, 15, { message: UserMessages.name.length.msg })
  public name: string;

  @IsEmail({}, { message: UserMessages.email.msg })
  public email: string;

  @IsOptional()
  @IsString({ message: UserMessages.avatar.msg })
  public avatar: string;

  @IsString({ message: UserMessages.password.required.msg })
  @Length(6, 12, { message: UserMessages.password.length.msg })
  public password: string;

  @IsEnum(userTypes, { message: UserMessages.type.msg })
  public type: UserType;
}

export class LoginUserDto {
  @IsEmail({}, { message: UserMessages.email.msg })
  public email!: string;

  @IsString({ message: UserMessages.password.required.msg })
  @Length(6, 12, { message: UserMessages.password.length.msg })
  public password!: string;
}

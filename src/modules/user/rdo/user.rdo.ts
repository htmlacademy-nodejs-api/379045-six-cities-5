import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;

  @Expose()
  public favorites: string[];
}

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;
}

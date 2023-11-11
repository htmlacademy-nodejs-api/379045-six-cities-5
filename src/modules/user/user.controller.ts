import { injectable, inject } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpError, PrivateRouteMiddleware, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../shared/libs/rest/index.js';
import { Component, HttpMethod, Req } from '../../shared/types/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { UserService } from './user.service.js';
import { Config, RestSchema } from '../../shared/libs/config/index.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../shared/helpers/index.js';
import { LoggedUserRdo, UserRdo } from './rdo/user.rdo.js';
import { CreateUserDto, LoginUserDto } from './dto/user.dto.js';
import { AuthService } from '../auth/index.js';
import { OfferService } from '../offer/offer.service.js';
import { OfferRdo } from '../offer/rdo/offer.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,
    @inject(Component.UserService)
    private readonly userService: UserService,
    @inject(Component.Config)
    private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService)
    private readonly authService: AuthService,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({ path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIR'), 'avatar'),
      ]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });

    this.addRoute({
      path: '/favorites/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/favorites/',
      method: HttpMethod.Patch,
      handler: this.updateFavoriteStatus,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, { from: 'body', name: 'offerId' }),
      ]
    });
  }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const result = await this.userService.findFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async create({ body }: Req<CreateUserDto>, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: Req<LoginUserDto>, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, { filepath: req.file?.path });
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async updateFavoriteStatus({ body, tokenPayload }: Request<{ value?: boolean, offerId?: string }>, res: Response): Promise<void> {
    const updatedUser = await this.userService.changeFavorites(tokenPayload.id, <string>body.offerId, <boolean>body.value);
    this.noContent(res, fillDTO(UserRdo, updatedUser));
  }
}

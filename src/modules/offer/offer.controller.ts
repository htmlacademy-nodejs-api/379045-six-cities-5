import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpError, ValidateDtoMiddleware, ValidateObjectIdMiddleware, PrivateRouteMiddleware, CheckingUserAccessMiddleware } from '../../shared/libs/rest/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { Component, HttpMethod, Req } from '../../shared/types/index.js';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../shared/helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { CommentService } from '../comment/comment-service.interface.js';
import { DEFAULT_OFFERS_COUNT } from './offer.const.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, { from: 'params', name: 'offerId' }),
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.showPremium,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new CheckingUserAccessMiddleware(this.offerService, 'offerId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, { from: 'params', name: 'offerId' }),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new CheckingUserAccessMiddleware(this.offerService, 'offerId'),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, { from: 'params', name: 'offerId' }),
      ]
    });
  }

  public async index({ query: { limit } }: Request, res: Response): Promise<void> {
    const count = limit ? limit as unknown as number : DEFAULT_OFFERS_COUNT;
    const result = await this.offerService.find(count);

    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async create({ body, tokenPayload }: Req<CreateOfferDto>, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);

    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params: { offerId, } }: Req<unknown, { offerId?: string }>, res: Response): Promise<void> {

    const result = await this.offerService.findById(offerId as string);

    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async showPremium({ params: { city } }: Req<unknown, { city?: string }>, res: Response): Promise<void> {

    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        '«city» parameter is not defined',
        'OfferController'
      );
    }

    const cityNameCapitalized = city.charAt(0).toUpperCase() + city.slice(1);

    const result = await this.offerService.findPremium(cityNameCapitalized);

    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete({ params: { offerId } }: Req<unknown, { offerId?: string }>, res: Response): Promise<void> {
    const id = offerId as string;

    const result = await this.offerService.deleteById(id);
    await this.commentService.deleteByOfferId(id);

    this.noContent(res, fillDTO(OfferRdo, result));
  }

  public async update({ body, params: { offerId } }: Request<{ offerId?: string }, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(offerId as string, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }
}

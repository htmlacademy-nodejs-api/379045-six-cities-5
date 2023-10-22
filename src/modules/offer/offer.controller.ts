import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../shared/libs/rest/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { Component, HttpMethod, Req } from '../../shared/types/index.js';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../shared/helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto } from './dto/offer.dto.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.showPremium });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    // this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    // this.addRoute({ path: '/:offerId/favorite/', method: HttpMethod.Put, handler: this.updateFavoriteStatus });
    // this.addRoute({ path: '/:offerId/comments/', method: HttpMethod.Get, handler: this.getAllComments });
    // this.addRoute({ path: '/:offerId/comments/', method: HttpMethod.Post, handler: this.createComment });
  }

  public async index(_req: Request, res: Response): Promise<void> {

    const result = await this.offerService.find();

    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async create({ body }: Req<CreateOfferDto>, res: Response): Promise<void> {
    const result = await this.offerService.create(body);

    this.created(res, fillDTO(CreateOfferDto, result));
  }

  public async show({ params: { offerId } }: Req<unknown, { offerId?: string }>, res: Response): Promise<void> {

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        '«offerId» parameter is not defined',
        'OfferController'
      );
    }

    const result = await this.offerService.findById(offerId);

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

    const result = await this.offerService.findPremium(city);

    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete({ params: { offerId } }: Req<unknown, { offerId?: string }>, res: Response): Promise<void> {

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        '«offerId» parameter is not defined',
        'OfferController'
      );
    }

    const result = await this.offerService.deleteById(offerId);

    this.noContent(res, fillDTO(OfferRdo, result));
  }
}

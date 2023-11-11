import { injectable, inject } from 'inversify';
import { BaseController, PrivateRouteMiddleware, ValidateDtoMiddleware, DocumentExistsMiddleware, ValidateObjectIdMiddleware } from '../../shared/libs/rest/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { Component, HttpMethod, Req } from '../../shared/types/index.js';
import { CreateCommentDto } from './dto/comment.dto.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../shared/helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, { from: 'params', name: 'offerId' }),
      ]
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, { from: 'body', name: 'offerId' }),
      ]
    });
  }

  public async index({ params: { offerId } }: Request<{ offerId?: string }>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(offerId as string);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create({ body, tokenPayload }: Req<CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    const { rating } = await this.commentService.calculateAvgRating(body.offerId);

    await this.offerService.incCommentsCount(body.offerId);
    await this.offerService.updateRating(body.offerId, rating);

    this.created(res, fillDTO(CommentRdo, comment));
  }
}

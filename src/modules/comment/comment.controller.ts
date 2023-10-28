import { injectable, inject } from 'inversify';
import { BaseController, DocumentExistsMiddleware, ValidateDtoMiddleware } from '../../shared/libs/rest/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { Component, HttpMethod, Req } from '../../shared/types/index.js';
import { CreateCommentDto } from './dto/comment.dto.js';
import { Response } from 'express';
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
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, { from: 'body', name: 'offerId' }),
      ]
    });
  }

  public async create({ body }: Req<CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.create(body);
    await this.offerService.incCommentsCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}

import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { DocumentFind } from '../../../types/index.js';

export class CheckingUserAccessMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentFind,
    private param: string
  ) { }

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const id = params[this.param];
    const document = await this.service.findById(id);

    if (tokenPayload.id === document?.userId._id.toString()) {
      return next();
    }

    throw new HttpError(
      StatusCodes.FORBIDDEN,
      'Access denied',
      'CheckingUserAccessMiddleware'
    );
  }
}

import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { Component } from '../../shared/types/index.js';
import { CommentService } from './comment.service.js';

export const createCommentContainer = () => {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService)
    .to(CommentService)
    .inSingletonScope();

  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return container;
};

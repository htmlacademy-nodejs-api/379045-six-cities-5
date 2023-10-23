import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { Component } from '../../shared/types/index.js';
import { CommentService } from './comment.service.js';
import { CommentModel } from '../models.init.js';
import { Controller } from '../../shared/libs/rest/index.js';
import { CommentController } from './comment.controller.js';

export const createCommentContainer = () => {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService)
    .to(CommentService)
    .inSingletonScope();

  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  container.bind<Controller>(Component.CommentController)
    .to(CommentController).inSingletonScope();

  return container;
};

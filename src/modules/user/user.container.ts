import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../shared/types/index.js';
import { UserController, UserEntity, UserService } from './index.js';
import { UserModel } from '../models.init.js';
import { Controller } from '../../shared/libs/rest/index.js';

export const createUserContainer = () => {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(UserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  container.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return container;
};

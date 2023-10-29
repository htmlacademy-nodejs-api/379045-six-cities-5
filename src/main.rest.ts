import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApp } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createRestAppContainer } from './rest/index.js';
import { createUserContainer } from './modules/user/index.js';
import { createOfferContainer } from './modules/offer/index.js';
import { createCommentContainer } from './modules/comment/index.js';
import { createAuthContainer } from './modules/auth/index.js';

async function bootstrap() {
  const container = Container.merge(
    createRestAppContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const app = container.get<RestApp>(Component.RestApp);
  await app.init();
}

bootstrap();

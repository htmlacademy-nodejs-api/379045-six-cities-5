import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestApp } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';
import { DatabaseClient, MongoDatabaseClient } from './shared/libs/database-client/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const app = container.get<RestApp>(Component.RestApp);
  await app.init();
}

bootstrap();

import { Container } from 'inversify';
import { AuthService } from './auth.service.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';
import { Component } from '../../shared/types/index.js';
import { ExceptionFilter } from '../../shared/libs/rest/index.js';

export function createAuthContainer() {
  const container = new Container();
  container.bind<AuthService>(Component.AuthService).to(AuthService).inSingletonScope();
  container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return container;
}

import { Container } from 'inversify';
import { Component } from '../../shared/types/index.js';
import { OfferService } from './offer.service.js';
import { OfferEntity } from './offer.entity.js';
import { types } from '@typegoose/typegoose';
import { OfferModel } from '../models.init.js';
import { Controller } from '../../shared/libs/rest/index.js';
import { OfferController } from './offer.controller.js';

export const createOfferContainer = () => {
  const container = new Container();

  container.bind<OfferService>(Component.OfferService).to(OfferService);
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return container;
};

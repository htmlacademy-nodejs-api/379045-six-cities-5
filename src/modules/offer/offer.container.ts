import { Container } from 'inversify';
import { Component } from '../../shared/types/index.js';
import { OfferService } from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { types } from '@typegoose/typegoose';

export const createOfferContainer = () => {
  const container = new Container();

  container.bind<OfferService>(Component.OfferService).to(OfferService);
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return container;
};

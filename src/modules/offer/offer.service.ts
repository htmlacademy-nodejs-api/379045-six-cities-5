import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../shared/types/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto.js';
import { OfferService as OfferServiceInterface } from './offer-service.interface.js';
import { MAX_PREMIUM_OFFERS_COUNT } from './offer.const.js';

@injectable()
export class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate('userId').exec();
  }

  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: documentId })) !== null;
  }

  public async incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': { commentsCount: 1 }
      },
      { new: true })
      .exec();
  }

  public async findPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, premium: true })
      .populate('userId')
      .limit(MAX_PREMIUM_OFFERS_COUNT)
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async updateRating(offerId: string, rating: number): Promise<void> {
    this.offerModel
      .findByIdAndUpdate(offerId,
        { '$set': { rating } },
        { new: true })
      .exec();
  }
}

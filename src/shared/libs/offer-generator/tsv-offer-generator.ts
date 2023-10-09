import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, userTypes } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const Rating = { MIN: 1, MAX: 5};
const Price = { MIN: 100, MAX: 100000 };
const Guests = { MIN: 1, MAX: 10 };
const Rooms = { MIN: 1, MAX: 8 };

const WeekDay = { FIRST: 1, LAST: 7 };

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const { mockData } = this;
    const title = getRandomItem(mockData.titles);
    const description = getRandomItem(mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDay.FIRST, WeekDay.LAST), 'day')
      .toISOString();
    const city = getRandomItem(mockData.cities);
    const preview = getRandomItem(mockData.previews);
    const photos = getRandomItems(mockData.photos).join(';');
    const rating = generateRandomValue(Rating.MIN, Rating.MAX);
    const type = getRandomItem(mockData.types);
    const roomsCount = generateRandomValue(Rooms.MIN, Rooms.MAX);
    const guestsCount = generateRandomValue(Guests.MIN, Guests.MAX);
    const price = generateRandomValue(Price.MIN, Price.MAX);
    const comforts = getRandomItems(mockData.comforts).join(';');
    const name = getRandomItem(mockData.names);
    const email = getRandomItem(mockData.emails);
    const avatar = getRandomItem(mockData.avatars);
    const userType = getRandomItem([...userTypes]);
    const commentsCount = generateRandomValue(Rating.MIN, Rating.MAX);
    const coords = getRandomItem(mockData.coords);

    return [
      title,
      description,
      createdDate,
      city,
      preview,
      photos,
      rating,
      type,
      roomsCount,
      guestsCount,
      price,
      comforts,
      name,
      email,
      avatar,
      userType,
      commentsCount,
      coords,
    ].join('\t');
  }
}

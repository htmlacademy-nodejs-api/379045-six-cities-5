import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { CiryCoords, Offer, OfferType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, preview, photos, rating, type, roomsCount, guestsCount, price, comforts, name, email, avatar, password, userType, commentsCount, coords]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city,
        preview,
        photos: photos.split(';').map((photo) => photo),
        premium: Math.random() < 0.5,
        favored: Math.random() < 0.5,
        rating: Number.parseInt(rating, 10),
        roomsCount: Number.parseInt(roomsCount, 10),
        guestsCount: Number.parseInt(guestsCount, 10),
        type: type as OfferType,
        commentsCount: Number.parseInt(commentsCount, 10),
        coords: this.getCoords(coords),
        comforts: comforts.split(';').map((value) => value),
        price,
        author: { name, email, password, avatar, type: userType as 'standard' | 'pro' },
      }));
  }

  private getCoords(coords: string): CiryCoords {
    const [latitude, longitude] = coords.split(';');
    return { latitude: Number.parseInt(latitude, 10), longitude: Number.parseInt(longitude, 10) };
  }
}

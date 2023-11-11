import { Length, IsInt, Min, Max, IsArray, IsString, IsBoolean, IsObject, IsEnum, IsOptional, IsMimeType, ArrayMinSize, ArrayMaxSize, ArrayUnique } from 'class-validator';
import { OfferType, CiryCoords, CityName, Comforts } from '../../../shared/types/index.js';
import { OfferMessages } from './validate-messages.js';


export class CreateOfferDto {
  public userId: string;

  @Length(10, 100, { message: OfferMessages.title.msg })
  public title: string;

  @Length(20, 1024, { message: OfferMessages.description.msg })
  public description: string;

  @IsEnum(CityName, { message: OfferMessages.city.msg })
  public city: CityName;

  @IsOptional()
  @IsString({ message: OfferMessages.preview.msg })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: OfferMessages.photos.arr.msg })
  @ArrayMinSize(6, { message: OfferMessages.photos.arrSize.msg })
  @ArrayMaxSize(6, { message: OfferMessages.photos.arrSize.msg })
  @IsString({ each: true })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferMessages.premium.msg })
  public premium: boolean;

  @IsOptional()
  public rating: number;

  @IsOptional()
  @IsEnum(OfferType, { message: OfferMessages.type.msg })
  public type: OfferType;

  @IsInt({ message: OfferMessages.roomsCount.int.msg })
  @Min(1, { message: OfferMessages.roomsCount.min.msg })
  @Max(8, { message: OfferMessages.roomsCount.max.msg })
  public roomsCount: number;

  @IsInt({ message: OfferMessages.roomsCount.int.msg })
  @Min(1, { message: OfferMessages.roomsCount.min.msg })
  @Max(10, { message: OfferMessages.roomsCount.max.msg })
  public guestsCount: number;

  @IsInt({ message: OfferMessages.price.int.msg })
  @Min(100, { message: OfferMessages.price.min.msg })
  @Max(100_000, { message: OfferMessages.price.max.msg })
  public price: string;

  @IsArray({ message: OfferMessages.comforts.arr.msg })
  @IsEnum(Comforts, { each: true, message: OfferMessages.comforts.enum.msg })
  @ArrayUnique({ message: OfferMessages.comforts.arrUnique.msg })
  @ArrayMinSize(1, { message: OfferMessages.comforts.minSize.msg })
  public comforts: string[];

  @IsObject({ message: OfferMessages.coords.isObject.msg })
  public coords: CiryCoords;
}

export class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100, { message: OfferMessages.title.msg })
  public title: string;

  @IsOptional()
  @Length(20, 1024, { message: OfferMessages.description.msg })
  public description: string;

  @IsOptional()
  @IsEnum(CityName, { message: OfferMessages.city.msg })
  public city: CityName;

  @IsOptional()
  @IsMimeType({ message: OfferMessages.preview.msg })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: OfferMessages.photos.arr.msg })
  @ArrayMinSize(6, { message: OfferMessages.photos.arrSize.msg })
  @ArrayMaxSize(6, { message: OfferMessages.photos.arrSize.msg })
  @IsString({ each: true })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferMessages.premium.msg })
  public premium: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: OfferMessages.type.msg })
  public type: OfferType;

  @IsOptional()
  @IsInt({ message: OfferMessages.roomsCount.int.msg })
  @Min(1, { message: OfferMessages.roomsCount.min.msg })
  @Max(10, { message: OfferMessages.roomsCount.max.msg })
  public guestsCount: number;

  @IsOptional()
  @IsInt({ message: OfferMessages.price.int.msg })
  @Min(100, { message: OfferMessages.price.min.msg })
  @Max(100_000, { message: OfferMessages.price.max.msg })
  public price: string;

  @IsOptional()
  @IsArray({ message: OfferMessages.comforts.arr.msg })
  @IsEnum(Comforts, { each: true, message: OfferMessages.comforts.enum.msg })
  @ArrayUnique({ message: OfferMessages.comforts.arrUnique.msg })
  @ArrayMinSize(1, { message: OfferMessages.comforts.minSize.msg })
  public comforts: string[];

  @IsOptional()
  @IsObject({ message: OfferMessages.coords.isObject.msg })
  public coords: CiryCoords;
}

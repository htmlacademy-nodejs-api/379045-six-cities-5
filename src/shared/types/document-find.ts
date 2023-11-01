import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export interface DocumentFind {
  findById(id: string): Promise<DocumentType<{ userId: {_id: Types.ObjectId} }> | null>;
}

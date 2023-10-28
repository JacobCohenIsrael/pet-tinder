import { Inject } from '@nestjs/common';
import { MongoService } from '../mongo.service';
import { Document, WithId } from 'mongodb';

export abstract class AbstractCollection<T extends Document> {
  @Inject(MongoService) private readonly mongoService: MongoService;

  public async find(filter: any): Promise<WithId<T>> {
    return this.mongoService.db
      .collection<T>(this.getCollectionName())
      .find(filter)
      .next();
  }

  protected abstract getCollectionName(): string;
}

import { Inject } from '@nestjs/common';
import { MongoService } from '../mongo.service';
import { Document, UpdateFilter, WithId } from 'mongodb';

export abstract class AbstractCollection<T extends Document> {
  @Inject(MongoService) private readonly mongoService: MongoService;

  public async find(filter: any): Promise<WithId<T>> {
    return this.mongoService.db
      .collection<T>(this.getCollectionName())
      .find(filter)
      .next();
  }

  protected async update(filter: any, update: UpdateFilter<T>) {
    return this.mongoService.db
      .collection<T>(this.getCollectionName())
      .updateOne(filter, update, {
        upsert: true,
      });
  }

  protected abstract getCollectionName(): string;
}

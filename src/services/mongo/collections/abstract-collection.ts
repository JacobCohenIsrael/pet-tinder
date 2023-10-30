import { Inject } from '@nestjs/common';
import { MongoService } from '../mongo.service';
import {
  Document,
  OptionalUnlessRequiredId,
  UpdateFilter,
  WithId,
} from 'mongodb';

export abstract class AbstractCollection<T extends Document> {
  @Inject(MongoService) private readonly mongoService: MongoService;

  public async find(filter: any): Promise<WithId<T>> {
    return this.getCollection().find(filter).next();
  }

  protected async update(filter: any, update: UpdateFilter<T>) {
    return this.getCollection().updateOne(filter, update, {
      upsert: true,
    });
  }

  protected async create(model: OptionalUnlessRequiredId<T>) {
    return this.getCollection().insertOne(model);
  }

  private getCollection() {
    return this.mongoService.db.collection<T>(this.getCollectionName());
  }

  protected abstract getCollectionName(): string;
}

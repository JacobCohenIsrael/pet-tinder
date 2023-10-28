import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class MongoService {
  constructor(@Inject('DATABASE_CONNECTION') public readonly db: Db) {}
}

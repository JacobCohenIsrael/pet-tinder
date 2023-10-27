import { Inject, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly mongo: MongoClient,
  ) {}
}

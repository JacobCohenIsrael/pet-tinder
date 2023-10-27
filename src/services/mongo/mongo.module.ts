import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient('mongodb://localhost:27017');
        await client.connect();
        return client.db('your-database-name');
      },
    },
    MongoService,
  ],
  exports: [MongoService],
})
export class MongoModule {}

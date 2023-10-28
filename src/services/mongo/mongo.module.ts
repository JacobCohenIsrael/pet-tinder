import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { Db, MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { PetsCollection } from './collections/pets.collection';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<Db> => {
        const connectionString = configService.get('database.connection');
        const client = new MongoClient(connectionString);
        await client.connect();
        return client.db('petsTinder');
      },
    },
    MongoService,
    PetsCollection,
  ],
  exports: [PetsCollection],
})
export class MongoModule {}

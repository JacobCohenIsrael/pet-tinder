import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { MongoModule } from 'src/services/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}

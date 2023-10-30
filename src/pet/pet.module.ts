import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { MongoModule } from '../services/mongo/mongo.module';
import { PetfinderModule } from '../vendors/petfinder/petfinder.module';

@Module({
  imports: [MongoModule, PetfinderModule],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}

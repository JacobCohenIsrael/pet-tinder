import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { MongoModule } from 'src/services/mongo/mongo.module';
import { PetfinderModule } from 'src/vendors/petfinder/petfinder.module';

@Module({
  imports: [MongoModule, PetfinderModule],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}

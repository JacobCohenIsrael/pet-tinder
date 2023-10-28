import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PetfinderService } from './petfinder.service';

@Module({
  imports: [HttpModule],
  providers: [PetfinderService],
  exports: [PetfinderService],
})
export class PetfinderModule {}

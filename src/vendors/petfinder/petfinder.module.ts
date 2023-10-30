import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PetfinderService } from './petfinder.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [PetfinderService],
  exports: [PetfinderService],
})
export class PetfinderModule {}

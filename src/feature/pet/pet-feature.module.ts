import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetModule } from 'src/pet/pet.module';

@Module({
  imports: [PetModule],
  controllers: [PetController],
})
export class PetFeatureModule {}

import { Module } from '@nestjs/common';
import { PetFeatureModule } from './feature/pet/pet-feature.module';

@Module({
  imports: [PetFeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

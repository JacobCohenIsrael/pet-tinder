import { Module } from '@nestjs/common';
import { PetFeatureModule } from './feature/pet/pet-feature.module';
import { ConfigModule } from '@nestjs/config';
import * as config from './configs/env.local.json';

@Module({
  imports: [
    PetFeatureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

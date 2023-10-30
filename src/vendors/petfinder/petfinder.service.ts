import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PetType } from './pet-type.enum';
import { AnimalModel } from './animal.model';
import { PetGender } from './pet-gender.enum';

@Injectable()
export class PetfinderService {
  private key: string;
  private secret: string;
  private petfinderConnector: any;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.key = configService.get('PETFINDER_API_KEY');
    this.secret = configService.get('PETFINDER_API_SECRET');
  }

  public async getAnimals(
    type: PetType,
    gender: PetGender,
    limit = 50,
  ): Promise<{ animals: AnimalModel[] }> {
    const connector = await this.getConnector();
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://api.petfinder.com/v2/animals?type=${type}&gender=${gender}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${connector.access_token}`,
          },
        },
      ),
    );
    return data;
  }

  public async getPetById(petId: number): Promise<AnimalModel> {
    const connector = await this.getConnector();
    const { data } = await firstValueFrom(
      this.httpService.get(`https://api.petfinder.com/v2/animals/${petId}`, {
        headers: {
          Authorization: `Bearer ${connector.access_token}`,
        },
      }),
    );
    return data.animal;
  }

  private async getConnector(): Promise<any> {
    // TODO: and only refresh after expiration
    const { data } = await firstValueFrom(
      this.httpService.post(`https://api.petfinder.com/v2/oauth2/token`, {
        grant_type: 'client_credentials',
        client_id: this.key,
        client_secret: this.secret,
      }),
    );
    this.petfinderConnector = data;
    return this.petfinderConnector;
  }
}

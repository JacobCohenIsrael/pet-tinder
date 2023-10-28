import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PetType } from './pet-type.enum';

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

  public async getPetByType(type: PetType, limit = 10) {
    const connector = await this.getConnector();
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://api.petfinder.com/v2/animals?type=${type}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${connector.access_token}`,
          },
        },
      ),
    );
    console.log(data);
  }

  private async getConnector(): Promise<any> {
    if (!this.petfinderConnector) {
      const { data } = await firstValueFrom(
        this.httpService.post(`https://api.petfinder.com/v2/oauth2/token`, {
          grant_type: 'client_credentials',
          client_id: this.key,
          client_secret: this.secret,
        }),
      );
      this.petfinderConnector = data;
    }
    return this.petfinderConnector;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { VoteRequest } from './models/vote-request';
import { PetsCollection } from 'src/services/mongo/collections/pets.collection';

@Injectable()
export class PetService {
  private readonly logger: Logger = new Logger(PetService.name);
  constructor(private readonly petsCollection: PetsCollection) {}
  public async vote(voteRequest: VoteRequest): Promise<void> {
    const pet = await this.petsCollection.find({ petId: voteRequest.dogId });
    this.logger.log(pet);
  }
}

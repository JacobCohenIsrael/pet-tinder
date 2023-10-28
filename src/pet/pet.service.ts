import { Injectable, Logger } from '@nestjs/common';
import { VoteRequest } from './models/vote-request';
import { PetsCollection } from 'src/services/mongo/collections/pets.collection';
import { PetfinderService } from 'src/vendors/petfinder/petfinder.service';

@Injectable()
export class PetService {
  private readonly logger: Logger = new Logger(PetService.name);
  constructor(
    private readonly petsCollection: PetsCollection,
    private readonly petfinderService: PetfinderService,
  ) {}
  public async vote(voteRequest: VoteRequest): Promise<void> {
    const pet = await this.petsCollection.find({ petId: voteRequest.dogId });
    if (voteRequest.like) {
      await this.petsCollection.likePet(pet);
    } else {
      await this.petsCollection.dislikePet(pet);
    }
  }
}

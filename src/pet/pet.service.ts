import { Injectable, Logger } from '@nestjs/common';
import { VoteRequest } from './models/vote.request';
import { PetsCollection } from 'src/services/mongo/collections/pets.collection';
import { PetfinderService } from 'src/vendors/petfinder/petfinder.service';
import { PetType } from 'src/vendors/petfinder/pet-type.enum';
import { AnimalModel } from 'src/vendors/petfinder/animal.model';
import { PetGender } from 'src/vendors/petfinder/pet-gender.enum';

@Injectable()
export class PetService {
  private readonly logger: Logger = new Logger(PetService.name);
  constructor(
    private readonly petsCollection: PetsCollection,
    private readonly petfinderService: PetfinderService,
  ) {}

  public async getPetsListByType(
    petType: PetType,
    petGender: PetGender,
  ): Promise<AnimalModel[]> {
    return (await this.petfinderService.getPetByType(petType, petGender)).animals.filter(
      (animal) => animal.photos.length > 0,
    );
  }

  public async vote(voteRequest: VoteRequest): Promise<void> {
    const pet = await this.petsCollection.find({ petId: voteRequest.dogId });
    if (voteRequest.like) {
      await this.petsCollection.likePet(pet);
    } else {
      await this.petsCollection.dislikePet(pet);
    }
  }
}

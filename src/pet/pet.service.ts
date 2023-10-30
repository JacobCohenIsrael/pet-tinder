import { Injectable, Logger } from '@nestjs/common';
import { VoteRequest } from './models/vote.request';
import { PetsCollection } from '../services/mongo/collections/pets.collection';
import { PetfinderService } from '..//vendors/petfinder/petfinder.service';
import { PetType } from '../vendors/petfinder/pet-type.enum';
import { AnimalModel } from '../vendors/petfinder/animal.model';
import { PetGender } from '../vendors/petfinder/pet-gender.enum';
import { PetModel } from './models/pet-model';

@Injectable()
export class PetService {
  private readonly logger: Logger = new Logger(PetService.name);
  constructor(
    private readonly petsCollection: PetsCollection,
    private readonly petfinderService: PetfinderService,
  ) {}

  public async getPetsList(
    petType: PetType,
    petGender: PetGender,
  ): Promise<AnimalModel[]> {
    return (
      await this.petfinderService.getAnimals(petType, petGender)
    ).animals.filter((animal) => animal.photos.length > 0);
  }

  public async vote(voteRequest: VoteRequest): Promise<void> {
    let pet: PetModel = await this.petsCollection.find({
      petId: voteRequest.petId,
    });

    if (!pet) {
      const animal = await this.petfinderService.getPetById(voteRequest.petId);
      pet = {
        petId: animal.id,
        petType: animal.type,
        likes: voteRequest.like ? 1 : 0,
        dislikes: voteRequest.like ? 0 : 1,
      };
      await this.petsCollection.add(pet);
    } else {
      if (voteRequest.like) {
        await this.petsCollection.likePet(pet);
      } else {
        await this.petsCollection.dislikePet(pet);
      }
    }
  }
}

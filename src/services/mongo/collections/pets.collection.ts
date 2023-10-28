import { AbstractCollection } from './abstract-collection';
import { PetModel } from 'src/pet/models/pet-model';

export class PetsCollection extends AbstractCollection<PetModel> {
  public async likePet(pet: PetModel) {
    this.update({ petId: pet.petId }, { $inc: { likes: 1 } });
  }

  public async dislikePet(pet: PetModel) {
    this.update({ petId: pet.petId }, { $inc: { dislikes: 1 } });
  }
  protected getCollectionName(): string {
    return 'pets';
  }
}

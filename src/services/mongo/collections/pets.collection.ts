import { AbstractCollection } from './abstract-collection';
import { PetModel } from '../../../pet/models/pet-model';

export class PetsCollection extends AbstractCollection<PetModel> {
  public async add(pet: PetModel) {
    await this.create(pet);
  }
  public async likePet(pet: PetModel) {
    await this.update({ petId: pet.petId }, { $inc: { likes: 1 } });
  }

  public async dislikePet(pet: PetModel) {
    await this.update({ petId: pet.petId }, { $inc: { dislikes: 1 } });
  }
  protected getCollectionName(): string {
    return 'pets';
  }
}

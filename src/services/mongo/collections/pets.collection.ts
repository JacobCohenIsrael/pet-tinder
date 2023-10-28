import { PetModule } from 'src/pet/pet.module';
import { AbstractCollection } from './abstract-collection';

export class PetsCollection extends AbstractCollection<PetModule> {
  protected getCollectionName(): string {
    return 'pets';
  }
}

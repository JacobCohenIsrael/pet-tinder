import { PetType } from '../../vendors/petfinder/pet-type.enum';

export class PetModel {
  petId: number;
  petType: PetType;
  likes: number;
  dislikes: number;
}

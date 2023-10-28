import { PetType } from 'src/vendors/petfinder/pet-type.enum';

export class PetModel {
  petId: string;
  petType: PetType;
  likes: number;
  dislikes: number;
}

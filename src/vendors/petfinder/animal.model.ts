import { PetGender } from './pet-gender.enum';
import { PetType } from './pet-type.enum';

export class AnimalModel {
  id: number;
  type: PetType;
  name: string;
  gender: PetGender = PetGender.All;
  breeds: { primary: string };
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
}

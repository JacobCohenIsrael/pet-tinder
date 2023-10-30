import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PetGender } from '../../vendors/petfinder/pet-gender.enum';
import { PetType } from '../../vendors/petfinder/pet-type.enum';

export class GetPetsListRequest {
  @IsEnum(PetType)
  @ApiProperty({
    enum: PetType,
  })
  petType: PetType;

  @IsEnum(PetGender)
  @ApiProperty({
    enum: PetGender,
  })
  petGender: PetGender;
}

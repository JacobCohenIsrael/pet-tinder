import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PetGender } from 'src/vendors/petfinder/pet-gender.enum';
import { PetType } from 'src/vendors/petfinder/pet-type.enum';

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

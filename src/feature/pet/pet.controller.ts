import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { VoteRequest } from '../../pet/models/vote.request';
import { PetService } from '../../pet/pet.service';
import { GetPetsListRequest } from '../..//pet/models/get-pets-list.request';
import { AnimalModel } from '../../vendors/petfinder/animal.model';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get a list of pets',
  })
  public async getPetsList(
    @Query() getPetListRequest: GetPetsListRequest,
  ): Promise<AnimalModel[]> {
    const animals = await this.petService.getPetsList(
      getPetListRequest.petType,
      getPetListRequest.petGender,
    );
    return animals.map((animal) => {
      return {
        id: animal.id,
        type: animal.type,
        name: animal.name,
        gender: animal.gender,
        breeds: animal.breeds,
        photos: animal.photos,
      };
    });
  }

  @Post('vote')
  @ApiOperation({
    summary: 'Like or dislike dog',
  })
  public async vote(@Body() voteRequest: VoteRequest): Promise<void> {
    this.petService.vote(voteRequest);
  }
}

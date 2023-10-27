import { Body, Controller, Post } from '@nestjs/common';
import { VoteRequest } from 'src/pet/models/vote-request';
import { PetService } from 'src/pet/pet.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}
  @Post('vote')
  @ApiOperation({
    summary: 'Like or dislike dog',
  })
  public async vote(@Body() voteRequest: VoteRequest): Promise<void> {
    this.petService.vote(voteRequest);
  }
}

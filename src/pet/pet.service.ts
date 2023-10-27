import { Injectable } from '@nestjs/common';
import { VoteRequest } from './models/vote-request';

@Injectable()
export class PetService {
  public async vote(voteRequest: VoteRequest): Promise<void> {
    console.log(voteRequest);
  }
}

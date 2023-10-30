import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VoteRequest {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  petId: number;

  @ApiProperty()
  @IsBoolean()
  like: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class VoteRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dogId: string;

  @ApiProperty()
  @IsBoolean()
  like: boolean;
}

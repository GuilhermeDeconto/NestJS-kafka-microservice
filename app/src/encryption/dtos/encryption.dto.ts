import { ApiProperty } from "@nestjs/swagger";

export class EncryptionDto {
  
  @ApiProperty()
  text: string;

}
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
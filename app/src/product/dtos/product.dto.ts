import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  barcode: string;
}
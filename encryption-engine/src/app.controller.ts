import { Body, Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { EncryptionInterface } from './interfaces/encryption.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('encrypt-message')
  async encryptMessage(@Body() encryptDto: any): Promise<EncryptionInterface> {
    return this.appService.encrypt(encryptDto.value);
  }

  @MessagePattern('decrypt-message')
  async decryptMessage(@Body() encryptedText: any): Promise<EncryptionInterface> {
    return this.appService.decrypt(encryptedText.value);
  }

  // @Post('encrypt')
  // encrypt(@Body() encryptDto: EncryptionDto): EncryptionInterface {
  //   return this.appService.encrypt(encryptDto);
  // }

  // @Post('decrypt')
  // decrypt(@Body() encryptedDto : EncryptionDto): EncryptionInterface {
  //   return this.appService.decrypt(encryptedDto);
  // }
}

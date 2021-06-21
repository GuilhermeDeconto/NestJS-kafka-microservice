import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EncryptionDto } from './dtos/encryption.dto';
import { Encryption } from './interfaces/encryption.interface';

@Controller('encryption')
export class EncryptionController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'encryption',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'encryption-consumer',
        allowAutoTopicCreation: true
      }
    }
  })

  private client: ClientKafka;

  async onModuleInit() {
    const requestPatterns = ['encrypt-message', 'decrypt-message'];

    requestPatterns.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  } 

  @Post('encrypt')
  encrypt(@Body() encryptDto: EncryptionDto): Observable<Encryption> {
    return this.client.send('encrypt-message', {text: encryptDto.text});
  }

  @Post('decrypt')
  decrypt(@Body() decryptDto: EncryptionDto): Observable<Encryption> {
    return this.client.send('decrypt-message', decryptDto);
  }

}
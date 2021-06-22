import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationController } from "./authentication.controller";

@Module({
    imports: [    
        ClientsModule.register([
        {
          name: 'AUTH_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'authentication',
              brokers: ['localhost:9092'],
            },
            consumer: {
              groupId: 'authentication-consumer'
            }
          }
        },
      ])],
    controllers: [AuthenticationController],
    providers: []
  })
  export class AuthenticationModule {}
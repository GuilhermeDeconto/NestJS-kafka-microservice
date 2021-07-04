import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guards';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'authentication',
            brokers: [`${process.env.BROKER || 'localhost:9092'}`],
          },
          consumer: {
            groupId: 'authentication-consumer'
          }
        }
      },
    ]),
  ClientsModule.register ([{
    name: 'USER_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: [`${process.env.BROKER || 'localhost:9092'}`],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true
      }
    }
  }]),
],
  controllers: [UsersController],
  providers: [AuthGuard],
})
export class UsersModule {}
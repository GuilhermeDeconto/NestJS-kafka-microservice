import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { EncryptionModule } from './encryption/encryption.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ]),
    UsersModule,
    ProductModule,
    EncryptionModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [    ClientsModule.register([
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
  ])]
})
export class AppModule {}
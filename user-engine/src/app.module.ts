import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserEntity } from './interfaces/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity]), ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'product',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'product-consumer-user-microservice'
        }
      }
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
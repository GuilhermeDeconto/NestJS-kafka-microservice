import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-consumer-authentication-microservice'
        }
      }
    },
  ]),JwtModule.register({
    secret: 'teste',
    signOptions: { expiresIn: '86400s' }})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
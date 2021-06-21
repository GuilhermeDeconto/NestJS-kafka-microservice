import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    EncryptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductEntity } from './interfaces/product.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ProductEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
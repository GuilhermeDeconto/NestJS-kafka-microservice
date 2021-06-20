import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConf } from 'src/typeorm.config';
import { ProductEntity } from '../interfaces/product.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: TypeOrmConf
  }),]
})
export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConf } from 'src/database/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: TypeOrmConf
  }),]
})
export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';

@Module({
  imports: [],
  controllers: [EncryptionController],
  providers: []
})
export class EncryptionModule {}
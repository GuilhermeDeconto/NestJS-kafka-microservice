import { Injectable } from '@nestjs/common';
import { EncryptionInterface } from './interfaces/encryption.interface';
import * as crypto from 'crypto';
import { EncryptionDto } from './dtos/encryption.dto';

@Injectable()
export class AppService {
  private masterkey = "b9f9abbe499aad019a3a77a15387ea81";

  encrypt(encryptDto: EncryptionDto) : EncryptionInterface {
    const text = encryptDto.text;
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(64);
    const key = crypto.pbkdf2Sync(this.masterkey, salt, 2145, 32, "sha512");
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf-8'),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    const response: EncryptionInterface = {
      text: Buffer.concat([salt, iv, tag, encrypted]).toString('base64'),
    };

    return response;
  }

  decrypt(decryptDto: EncryptionDto) : EncryptionInterface {
    const textData = decryptDto.text;
    const bData = Buffer.from(textData, 'base64');

    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const tag = bData.slice(80, 96);
    const text = bData.slice(96);
    const key = crypto.pbkdf2Sync(this.masterkey, salt, 2145, 32, 'sha512');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const decryptedtext = decipher.update(text) + decipher.final('utf-8');

    const response: EncryptionInterface = {
      text: decryptedtext,
    };

    return response;
  }
}

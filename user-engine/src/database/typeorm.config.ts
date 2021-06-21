import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { UserEntity } from "../interfaces/user.entity";

export class TypeOrmConf implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'docker',
            database: 'user',
            entities : [UserEntity],
            synchronize: true,
        }
    }
}
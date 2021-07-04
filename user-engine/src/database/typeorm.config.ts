import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { UserEntity } from "../interfaces/user.entity";

export class TypeOrmConf implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: `${process.env.POSTGRES_HOST || 'localhost'}`,
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: 'postgres',
            password: 'docker',
            database: 'user',
            entities : [UserEntity],
            synchronize: true,
        }
    }
}
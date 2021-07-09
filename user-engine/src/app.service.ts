import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { status: 'ACTIVE' }});
  }

  async findEmail(userEmail: string): Promise<User> {
    const {id, name,email, password, phone, status } = await this.userRepository.findOne({where: {email: userEmail}});
    
    if(!id) {
      throw new Error();
    }
    
    const response = {
      id,
      name,
      email,
      phone,
      password,
      status,
    };

    return response;
  }

  async find(userId: string): Promise<User> {
    const {id, name,email, password, phone, status } = await this.userRepository.findOne(userId);
    
    if(!id) {
      throw new Error();
    }
    
    const response = {
      id,
      name,
      email,
      phone,
      password,
      status,
    };

    return response;
  }

  async create(user: User): Promise<any> {
    const userEntity = this.userRepository.create(user);
    try {
      const userFinal =  await this.userRepository.save(userEntity);
      return {
        id: userFinal.id,
        name: userFinal.name,
        email: userFinal.email,
        phone: userFinal.phone
      };
    } catch (error) {
        return { message: error.detail, code: 400 }
    } 
  }

  async update(userData: UserEntity): Promise<void> {
    const { id, name, email, phone, password } = userData;
    const user = await this.find(id);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;

    await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({id});
  }

  async activate(id: string): Promise<void> {
    await this.userRepository.update(id, { status: 'ACTIVE' });
  }

  async inactivate(id: string): Promise<void> {
    await this.userRepository.update(id, { status: 'INACTIVE' });
  }
}
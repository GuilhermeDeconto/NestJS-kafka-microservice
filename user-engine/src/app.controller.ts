import { Controller, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { In } from 'typeorm';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Controller()
@Injectable()
export class AppController implements OnModuleInit {
  // Inject kafka client
  constructor(private readonly appService: AppService, @Inject('KAFKA_SERVICE')private client: ClientKafka) {}
  // Subscribe for response and connect as client
    async onModuleInit() {
      const requestPatters = ['find-all-product'];
      requestPatters.forEach(async pattern => {
        this.client.subscribeToResponseOf(pattern);
        await this.client.connect();
      });
    }  
    
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-user')
  async index(): Promise<UserEntity[]> {
    return await this.appService.findAll();;
  }

  // Example of communication between microservices
  @MessagePattern('find-all-user-product')
  async communicate(): Promise<UserEntity[]> {
    var array = await this.appService.findAll();
    try {
      // Send message to another microservice and wait for response
      array[0].test = await this.client.send('find-all-product', {}).toPromise();
    }catch(error){
      this.logger.error(error);
    }
    return array;
  }

  @MessagePattern('find-user')
  async find(@Payload() data: any): Promise<User> {
    return await this.appService.find(Number(data.value.id));
  }

  @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<UserEntity> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    return await this.appService.create(data.value);
  }

  @MessagePattern('update-user')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-user')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.delete(Number(data.value.id));
  }

  @MessagePattern('activate-user')
  async activate(@Payload() data: any): Promise<void> {
    return this.appService.activate(Number(data.value.id));
  }

  @MessagePattern('inactivate-user')
  async inactivate(@Payload() data: any): Promise<void> {
    return this.appService.inactivate(Number(data.value.id));
  }
}
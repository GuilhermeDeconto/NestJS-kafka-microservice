import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Controller()
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

  @MessagePattern('find-user')
  async find(@Payload() data: any): Promise<User> {
    return await this.appService.find(String(data.value.id));
  }

  @MessagePattern('find-user-email')
  async findName(@Payload() data: any): Promise<User> {
    return await this.appService.findEmail(String(data.value.email));
  }

  @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<User> {
    return await this.appService.create(data.value);
  }

  @MessagePattern('update-user')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-user')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.delete(String(data.value.id));
  }

  @MessagePattern('activate-user')
  async activate(@Payload() data: any): Promise<void> {
    return this.appService.activate(String(data.value.id));
  }

  @MessagePattern('inactivate-user')
  async inactivate(@Payload() data: any): Promise<void> {
    return this.appService.inactivate(String(data.value.id));
  }
}
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProductEntity } from './interfaces/product.entity';
import { Product } from './interfaces/product.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-product')
  async index(): Promise<ProductEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('find-product')
  async find(@Payload() data: any): Promise<Product> {
    return this.appService.find(Number(data.value.id));
  }

  @MessagePattern('create-product')
  async create(@Payload() data: any): Promise<ProductEntity> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    return await this.appService.create(data.value);
  }

  @MessagePattern('update-product')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-product')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.delete(Number(data.value.id));
  }

  @MessagePattern('activate-product')
  async activate(@Payload() data: any): Promise<void> {
    return this.appService.activate(Number(data.value.id));
  }

  @MessagePattern('inactivate-product')
  async inactivate(@Payload() data: any): Promise<void> {
    return this.appService.inactivate(Number(data.value.id));
  }
}
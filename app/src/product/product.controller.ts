import { Body, Controller, Delete, Get, OnModuleInit, Param, Patch, Post, Put } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ProductDto } from './dtos/product.dto';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'product',
        brokers: [`${process.env.BROKER || 'localhost:9092'}`],
      },
      consumer: {
        groupId: 'product-consumer',
        allowAutoTopicCreation: true
      }
    }
  })

  private client: ClientKafka;

  async onModuleInit() {
    const requestPatterns = ['find-all-product', 'find-product', 'create-product', 'update-product', 'delete-product', 'activate-product', 'inactivate-product'];

    requestPatterns.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }  

  @Get()
  index(): Observable<Product[]> {
    return this.client.send('find-all-product', {});
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<Product> {
    return this.client.send('find-product', {id})
  }

  @Post()
  @ApiBody({ type: ProductDto })
  create(@Body() user: ProductDto): Observable<Product> {
    return this.client.send('create-product', user);
  }

  @Put(':id')
  @ApiBody({ type: ProductDto })
  update(@Param('id') id: number, @Body() { name, brand, type, barcode }: ProductDto) {
    const payload = {
      id,
      name,
      brand,
      type,
      barcode,
    };

    return this.client.emit('update-product', payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.client.emit('delete-product', {id})
  }

  @Patch(':id/activate')
  activate(@Param('id') id: number) {
    return this.client.emit('activate-product', {id});
  }

  @Patch(':id/inactivate')
  inactivate(@Param('id') id: number) {
    return this.client.emit('inactivate-product', {id});
  }

}
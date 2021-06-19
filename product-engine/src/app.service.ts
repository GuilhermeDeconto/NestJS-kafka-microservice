import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './interfaces/product.entity';
import { Product } from './interfaces/product.interface';

@Injectable()
export class AppService {
  constructor(@InjectRepository(ProductEntity) private userRepository: Repository<ProductEntity>) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.userRepository.find({ where: { status: 'ACTIVE' }});
  }

  async find(userId: number): Promise<Product> {
    const {id, name, brand, type, barcode, status } = await this.userRepository.findOne(userId);
    
    if(!id) {
      throw new Error();
    }
    
    const response: Product = {
      id,
      name,
      brand,
      type,
      barcode,
      status,
    };

    return response;
  }

  async create(product: Product): Promise<ProductEntity> {
    return await this.userRepository.save(product);
  }

  async update(userData: ProductEntity): Promise<void> {
    const { id, name, brand, type, barcode } = userData;
    const product = await this.find(id);

    product.name = name ? name : product.name;
    product.brand = brand ? brand : product.brand;
    product.type = type ? type : product.type;
    product.barcode = barcode ? barcode : product.barcode;

    await this.userRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete({id});
  }

  async activate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'ACTIVE' });
  }

  async inactivate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'INACTIVE' });
  }
}
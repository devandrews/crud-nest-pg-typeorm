import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    const products = this.productRepository.find();

    if (!products) throw new NotFoundException();

    return products;
  }

  async getOne(id: number): Promise<Product> {
    const product = this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException();

    return;
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.productRepository.save(data);
  }

  async update(id: number, data: Product): Promise<Product> {
    await this.productRepository.update(id, data);
    return data;
  }

  async delete(id: number): Promise<number> {
    await this.productRepository.delete({ id });
    return id;
  }
}

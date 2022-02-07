import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  // private counter = 1;

  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product one',
  //     description: 'my description',
  //     price: 123,
  //     image: 'imagen.jpg',
  //     stock: 12,
  //   },
  // ];

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image = payload.image;
    // newProduct.name = payload.name;
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  // async porque esperamos respuesta del findOne
  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}

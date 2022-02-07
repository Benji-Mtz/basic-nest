import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
// import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

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

  findOne(id: number) {
    const product = this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }
  /*
  create(payload: CreateProductDto) {
    console.log(payload);
    this.counter = this.counter + 1;

    const newProduct = {
      id: this.counter,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }*/
}

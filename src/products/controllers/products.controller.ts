import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// import { Response } from 'express';
import { ProductsService } from '../services/products.service';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/products.dtos';

// localhost:3000/products
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // localhost:3000/products
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    // @Query('limit') limit = 100,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string,
    @Query() params: FilterProductDto,
  ) {
    return this.productService.findAll(params);
  }

  // @Get('products')
  // getProducts(@Query() params: any) {
  //   const { limit, offset } = params;

  //   return `products (limit) ${limit},  (offset) ${offset}`;
  // }

  // localhost:3000/products/:id
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  // Respuesta estilo Express con respuesta a cargo de nosotros
  // @Get(':id')
  // @HttpCode(HttpStatus.ACCEPTED)
  // getOne(@Res() response: Response, @Param('id') id: string) {
  //   response.status(202).send({
  //     message: `product - ${id}`,
  //   });
  //   return this.productService.findOne(+id);
  // }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.remove(id);
  }
}

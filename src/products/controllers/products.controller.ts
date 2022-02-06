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
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

// localhost:3000/products
@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(private productService: ProductsService) {}

  // localhost:3000/products
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `products (limit) ${limit},  (offset) ${offset},  (brand) ${brand}`,
    // };
    return this.productService.findAll();
  }

  // @Get('products')
  // getProducts(@Query() params: any) {
  //   const { limit, offset } = params;

  //   return `products (limit) ${limit},  (offset) ${offset}`;
  // }
  // localhost:3000/products/filter
  @Get('filter')
  getProductsFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  // localhost:3000/products/:id
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    // return {
    //   message: `product - ${id}`,
    // };

    return this.productService.findOne(id);
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

  /*
  @Get('products/:id')
  getProduct(@Param() params: any) {
    return `product - ${params.id}`;
  }
  */

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

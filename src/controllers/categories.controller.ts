import { Controller, Get, Param } from '@nestjs/common';
// localhost:3000/categories
@Controller('categories')
export class CategoriesController {

  // localhost:3000/categories/:id/products/:productId
  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `categories id: ${id}, product: ${productId}`;
  }

}

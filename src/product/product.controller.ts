import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.entity';
import { ProductService } from './product.service';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse({ type: Product, isArray: true })
  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @ApiOkResponse({ type: Product, isArray: false })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id);
  }

  @ApiCreatedResponse({ type: Product })
  @Post()
  create(@Body() body: Omit<Product, 'id'>) {
    return this.productService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Product) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}

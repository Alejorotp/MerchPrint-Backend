import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductUseCase } from '../../application/products/usecases/create-product.usecase';
import { GetProductsByCompanyUseCase } from '../../application/products/usecases/get-products-by-company.usecase';
import { GetProductUseCase } from '../../application/products/usecases/get-product.usecase';
import { UpdateProductUseCase } from '../../application/products/usecases/update-product.usecase';
import { DeleteProductUseCase } from '../../application/products/usecases/delete-product.usecase';
import { CreateProductDTO } from '../../application/products/dto/create-product.dto';
import { UpdateProductDTO } from '../../application/products/dto/update-product.dto';
import { toProductDTO } from '../../application/products/mappers/product.mapper';

@Controller()
export class ProductsRmqController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getProductsByCompany: GetProductsByCompanyUseCase,
    private readonly getProduct: GetProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
  ) {}

  @MessagePattern('products.create')
  async create(@Payload() data: CreateProductDTO) {
    const product = await this.createProduct.execute(data);
    return toProductDTO(product);
  }

  @MessagePattern('products.getByCompany')
  async getByCompany(@Payload() companyId: string) {
    const products = await this.getProductsByCompany.execute(companyId);
    return products.map(toProductDTO);
  }

  @MessagePattern('products.getById')
  async getById(@Payload() id: string) {
    const product = await this.getProduct.execute(id);
    if (!product) return null;
    return toProductDTO(product);
  }

  @MessagePattern('products.update')
  async update(@Payload() data: { id: string; body: UpdateProductDTO }) {
    const product = await this.updateProduct.execute(data.id, data.body);
    if (!product) return null;
    return toProductDTO(product);
  }

  @MessagePattern('products.delete')
  async delete(@Payload() id: string) {
    await this.deleteProduct.execute(id);
    return { message: 'Product deleted successfully' };
  }
}
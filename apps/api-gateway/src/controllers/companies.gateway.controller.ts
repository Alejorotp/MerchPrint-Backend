import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Companies & Products')
@Controller('companies')
export class CompaniesGatewayController {
  constructor(
    @Inject('COMPANIES_SERVICE')
    private readonly companiesClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully.' })
  async createCompany(@Body() body: any) {
    return firstValueFrom(this.companiesClient.send('companies.create', body));
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'List of all companies.' })
  async getAllCompanies() {
    return firstValueFrom(this.companiesClient.send('companies.getAll', {}));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Company found.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async getCompanyById(@Param('id') id: string) {
    return firstValueFrom(this.companiesClient.send('companies.getById', id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiResponse({ status: 200, description: 'Company updated successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async updateCompany(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(this.companiesClient.send('companies.update', { id, body }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async deleteCompany(@Param('id') id: string) {
    return firstValueFrom(this.companiesClient.send('companies.delete', id));
  }

  @Post(':companyId/products')
  @ApiOperation({ summary: 'Create a new product for a company' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  async createProduct(@Param('companyId') companyId: string, @Body() body: any) {
    body.companyId = companyId;
    return firstValueFrom(this.companiesClient.send('products.create', body));
  }

  @Get(':companyId/products')
  @ApiOperation({ summary: 'Get all products for a company' })
  @ApiResponse({ status: 200, description: 'List of products for the company.' })
  async getProductsByCompany(@Param('companyId') companyId: string) {
    return firstValueFrom(this.companiesClient.send('products.getByCompany', companyId));
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProductById(@Param('id') id: string) {
    return firstValueFrom(this.companiesClient.send('products.getById', id));
  }

  @Put('products/:id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async updateProduct(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(this.companiesClient.send('products.update', { id, body }));
  }

  @Delete('products/:id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async deleteProduct(@Param('id') id: string) {
    return firstValueFrom(this.companiesClient.send('products.delete', id));
  }
}

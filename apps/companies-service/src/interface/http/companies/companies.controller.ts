// companies.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCompanyDTO } from '../../../application/companies/dto/create-company.dto';
import { UpdateCompanyDTO } from '../../../application/companies/dto/update-company.dto';
import { Company } from '../../../domain/companies/company.entity';
import { CreateCompanyUseCase } from '../../../application/companies/usecases/create-company.usecase';
import { GetCompanyUseCase } from '../../../application/companies/usecases/get-company.usecase';
import { UpdateCompanyUseCase } from '../../../application/companies/usecases/update-company.usecase';
import { DeleteCompanyUseCase } from '../../../application/companies/usecases/delete-company.usecase';
import { GetAllCompaniesUseCase } from '../../../application/companies/usecases/get-all-companies.usecase';
import { ExistsCompanyByNameUseCase, ExistsCompanyByIdUseCase } from '../../../application/companies/usecases/exists-company.usecase';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly createCompany: CreateCompanyUseCase,
        private readonly getCompany: GetCompanyUseCase,
        private readonly updateCompany: UpdateCompanyUseCase,
        private readonly deleteCompany: DeleteCompanyUseCase,
        private readonly getAllCompanies: GetAllCompaniesUseCase,
        private readonly existsCompanyByName: ExistsCompanyByNameUseCase,
        private readonly existsCompanyById: ExistsCompanyByIdUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created.', type: Company })
    @ApiResponse({ status: 400, description: 'Bad Request. Company name already in use.' })
    async create(@Body() body: CreateCompanyDTO): Promise<Company> {
        const nameTaken = await this.existsCompanyByName.execute(body.name);
        if (nameTaken) throw new Error('Company name already in use');
        return this.createCompany.execute(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({ status: 200, description: 'Return all companies.', type: [Company] })
    async findAll(): Promise<Company[]> {
        return this.getAllCompanies.execute();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a company by id' })
    @ApiResponse({ status: 200, description: 'Return company.', type: Company })
    @ApiResponse({ status: 404, description: 'Company not found.' })
    async findOne(@Param('id') id: string): Promise<Company> {
        const company = await this.getCompany.execute(id);
        if (!company) throw new Error('Company not found');
        return company;
    }
    
    @Put(':id')
    @ApiOperation({ summary: 'Update a company' })
    @ApiResponse({ status: 200, description: 'The company has been successfully updated.', type: Company })
    @ApiResponse({ status: 404, description: 'Company not found.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Company name already in use.' })
    async update(@Param('id') id: string, @Body() body: UpdateCompanyDTO): Promise<Company | null> {
        const companyExists = await this.existsCompanyById.execute(id);
        if (!companyExists) throw new Error('Company not found');
        if (body.name) {
            const nameTaken = await this.existsCompanyByName.execute(body.name);
            if (nameTaken) throw new Error('Company name already in use');
        }
        return this.updateCompany.execute(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a company' })
    @ApiResponse({ status: 204, description: 'The company has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Company not found.' })
    async remove(@Param('id') id: string): Promise<void> {
        const companyExists = await this.existsCompanyById.execute(id);
        if (!companyExists) throw new Error('Company not found');
        return this.deleteCompany.execute(id);
    }

}
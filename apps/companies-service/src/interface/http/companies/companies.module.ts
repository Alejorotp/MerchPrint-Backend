// companies.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../../infrastructure/companies/mongoose/company.schema';
import { CompaniesController } from './companies.controller';
import { CreateCompanyUseCase } from '../../../application/companies/usecases/create-company.usecase';
import { GetCompanyUseCase } from '../../../application/companies/usecases/get-company.usecase';
import { UpdateCompanyUseCase } from '../../../application/companies/usecases/update-company.usecase';
import { DeleteCompanyUseCase } from '../../../application/companies/usecases/delete-company.usecase';
import { GetAllCompaniesUseCase } from '../../../application/companies/usecases/get-all-companies.usecase';
import { ExistsCompanyByNameUseCase, ExistsCompanyByIdUseCase } from '../../../application/companies/usecases/exists-company.usecase';
import { COMPANY_REPOSITORY } from '../../../application/tokens';
import { MongooseCompanyRepository } from '../../../infrastructure/companies/mongoose/mongoose-company.repository';
import { InMemoryCompanyRepository } from '../../../infrastructure/companies/in-memory/in-memory-company.repository';

const useMongoose = !!process.env.DB_URI;

@Module({
    imports: [
        ...(useMongoose ? [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])] : []),
    ],
    controllers: [CompaniesController],
    providers: [
        {
            provide: COMPANY_REPOSITORY,
            useClass: useMongoose ? MongooseCompanyRepository : InMemoryCompanyRepository,
        },
        { provide: CreateCompanyUseCase, useFactory: (repo: any) => new CreateCompanyUseCase(repo), inject: [COMPANY_REPOSITORY] },
        { provide: GetCompanyUseCase, useFactory: (repo: any) => new GetCompanyUseCase(repo), inject: [COMPANY_REPOSITORY] },
        { provide: UpdateCompanyUseCase, useFactory: (repo: any) => new UpdateCompanyUseCase(repo), inject: [COMPANY_REPOSITORY] },
        { provide: DeleteCompanyUseCase, useFactory: (repo: any) => new DeleteCompanyUseCase(repo), inject: [COMPANY_REPOSITORY] },
        { provide: GetAllCompaniesUseCase, useFactory: (repo: any) => new GetAllCompaniesUseCase(repo), inject: [COMPANY_REPOSITORY] },
        { provide: ExistsCompanyByNameUseCase, useFactory: (repo: any) => new ExistsCompanyByNameUseCase(repo), inject: [COMPANY_REPOSITORY] },
        { provide: ExistsCompanyByIdUseCase, useFactory: (repo: any) => new ExistsCompanyByIdUseCase(repo), inject: [COMPANY_REPOSITORY] },
    ],
})
export class CompaniesHttpModule {}
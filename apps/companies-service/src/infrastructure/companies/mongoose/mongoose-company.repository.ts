// mongoose-company.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';
import { Company } from '../../../domain/companies/company.entity';
import { CompanyDocument, Company as CompanySchema } from './company.schema';

@Injectable()
export class MongooseCompanyRepository implements CompanyRepositoryPort {
    constructor(
        @InjectModel(CompanySchema.name)
        private readonly companyModel: Model<CompanyDocument>,
    ) {}

    async save(company: Company): Promise<Company> {
        const createdCompany = new this.companyModel(company);
        return createdCompany.save();
    }

    async findById(id: string): Promise<Company | null> {
        return this.companyModel.findById(id).exec();
    }

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async delete(id: string): Promise<void> {
        await this.companyModel.findByIdAndDelete(id).exec();
    }

    async existsByName(name: string): Promise<boolean> {
        const count = await this.companyModel.countDocuments({ name }).exec();
        return count > 0;
    }

    async existsById(id: string): Promise<boolean> {
        const count = await this.companyModel.countDocuments({ _id: id }).exec();
        return count > 0;
    }

    async update(id: string, update: Partial<Company>): Promise<Company | null> {
        return this.companyModel.findByIdAndUpdate(id, update, { new: true }).exec();
    }
}
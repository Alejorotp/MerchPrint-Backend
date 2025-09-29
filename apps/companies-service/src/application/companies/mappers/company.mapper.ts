// company.mapper.ts

import { Company } from '../../../domain/companies/company.entity';
import { CompanyDTO } from '../dto/company.dto';

export const toCompanyDTO = (company: Company): CompanyDTO => ({
    id: company.id ?? '',
    userId: company.userId,
    name: company.name,
    contactEmail: company.contactEmail,
});
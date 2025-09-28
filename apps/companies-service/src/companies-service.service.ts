import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

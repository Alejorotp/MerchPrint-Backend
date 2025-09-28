import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesServiceController } from './companies-service.controller';
import { CompaniesServiceService } from './companies-service.service';

describe('CompaniesServiceController', () => {
  let companiesServiceController: CompaniesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesServiceController],
      providers: [CompaniesServiceService],
    }).compile();

    companiesServiceController = app.get<CompaniesServiceController>(CompaniesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(companiesServiceController.getHello()).toBe('Hello World!');
    });
  });
});

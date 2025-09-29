// requirements.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateRequirementsUseCase } from '../../../application/events/usecases/create-requirements.usecase';
import { REQUIREMENTS_REPOSITORY } from '../../../application/tokens';
import { MongooseRequirementsRepository } from '../../../infrastructure/mongoose/mongoose-requirements.repository';
import { InMemoryRequirementsRepository } from '../../../infrastructure/in-memory/in-memory-requirements.repository';
import { Requirements, RequirementsSchema } from '../../../infrastructure/mongoose/requirements.schema';
import { RequirementsController } from './requirements.controller';
const useMongoose = !!process.env.DB_URI;
@Module({
    imports: [
        ...(useMongoose ? [MongooseModule.forFeature([{ name: Requirements.name, schema: RequirementsSchema }])] : []),
    ],
    controllers: [RequirementsController],
    providers: [
        {
            provide: REQUIREMENTS_REPOSITORY,
            useClass: useMongoose ? MongooseRequirementsRepository : InMemoryRequirementsRepository,
        },
        { provide: CreateRequirementsUseCase, useFactory: (repo: any) => new CreateRequirementsUseCase(repo), inject: [REQUIREMENTS_REPOSITORY] },
    ],
})
export class RequirementsHttpModule {}
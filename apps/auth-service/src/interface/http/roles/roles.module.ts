// roles.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateRoleUseCase } from '../../../application/roles/usecases/create-role.usecase';
import { ROLE_REPOSITORY } from '../../../application/tokens';
import { MongooseRoleRepository } from '../../../infrastructure/roles/mongoose/mongoose-role.repository';
import { InMemoryRoleRepository } from '../../../infrastructure/roles/in-memory/in-memory-role.repository';
import { Role, RoleSchema } from '../../../infrastructure/roles/mongoose/role.schema';
import { RolesController } from './roles.controller';
import { GetRoleUseCase } from '../../../application/roles/usecases/get-role.usecase';
import { DeleteRoleUseCase } from '../../../application/roles/usecases/delete-role.usecase';
import { UpdateRoleUseCase } from '../../../application/roles/usecases/update-role.usecase';
import { GetAllRolesUseCase } from '../../../application/roles/usecases/get-all-roles.usecase';
import { ExistsRoleByNameUseCase, ExistsRoleByIdUseCase } from '../../../application/roles/usecases/exists-role.usecase';

const useMongoose = !!process.env.DB_URI;

@Module({
  imports: [
    ...(useMongoose ? [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])] : []),
  ],
  controllers: [RolesController],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: useMongoose ? MongooseRoleRepository : InMemoryRoleRepository,
    },
    { provide: CreateRoleUseCase, useFactory: (repo: any) => new CreateRoleUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: GetRoleUseCase, useFactory: (repo: any) => new GetRoleUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: DeleteRoleUseCase, useFactory: (repo: any) => new DeleteRoleUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: UpdateRoleUseCase, useFactory: (repo: any) => new UpdateRoleUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: GetAllRolesUseCase, useFactory: (repo: any) => new GetAllRolesUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: ExistsRoleByNameUseCase, useFactory: (repo: any) => new ExistsRoleByNameUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: ExistsRoleByIdUseCase, useFactory: (repo: any) => new ExistsRoleByIdUseCase(repo), inject: [ROLE_REPOSITORY] },
  ],
})
export class RolesHttpModule {}
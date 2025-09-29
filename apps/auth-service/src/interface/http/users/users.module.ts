// users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from '../../../application/users/usecases/create-user.usecase';
import { USER_REPOSITORY } from '../../../application/tokens';
import { MongooseUserRepository } from '../../../infrastructure/users/mongoose/mongoose-user.repository';
import { InMemoryUserRepository } from '../../../infrastructure/users/in-memory/in-memory-user.repository';
import { User, UserSchema } from '../../../infrastructure/users/mongoose/user.schema';
import { UsersController } from './users.controller';
import { GetUserUseCase } from 'apps/auth-service/src/application/users/usecases/get-user.usecase';
import { DeleteUserUseCase } from 'apps/auth-service/src/application/users/usecases/delete-user.usecase';
import { UpdateUserUseCase } from 'apps/auth-service/src/application/users/usecases/update-user.usecase';
import { ExistsByEmailUseCase, ExistsByIdUseCase } from 'apps/auth-service/src/application/users/usecases/exists-user.usecase';
import { GetAllUsersUseCase } from 'apps/auth-service/src/application/users/usecases/get-all-users.usecase';

const useMongoose = !!process.env.DB_URI;

@Module({
  imports: [
    ...(useMongoose ? [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])] : []),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: useMongoose ? MongooseUserRepository : InMemoryUserRepository,
    },
    { provide: CreateUserUseCase, useFactory: (repo: any) => new CreateUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: GetUserUseCase, useFactory: (repo: any) => new GetUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: DeleteUserUseCase, useFactory: (repo: any) => new DeleteUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: UpdateUserUseCase, useFactory: (repo: any) => new UpdateUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: GetAllUsersUseCase, useFactory: (repo: any) => new GetAllUsersUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: ExistsByEmailUseCase, useFactory: (repo: any) => new ExistsByEmailUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: ExistsByIdUseCase, useFactory: (repo: any) => new ExistsByIdUseCase(repo), inject: [USER_REPOSITORY] },
  ],
})
export class UsersHttpModule {}
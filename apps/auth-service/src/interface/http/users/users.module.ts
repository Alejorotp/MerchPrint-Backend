// users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserUseCase } from '../../../application/users/usecases/create-user.usecase';
import { USER_REPOSITORY, ROLE_REPOSITORY, PASSWORD_SERVICE, TOKEN_SERVICE } from '../../../application/tokens';
import { MongooseUserRepository } from '../../../infrastructure/users/mongoose/mongoose-user.repository';
import { InMemoryUserRepository } from '../../../infrastructure/users/in-memory/in-memory-user.repository';
import { User, UserSchema } from '../../../infrastructure/users/mongoose/user.schema';
import { MongooseRoleRepository } from '../../../infrastructure/roles/mongoose/mongoose-role.repository';
import { InMemoryRoleRepository } from '../../../infrastructure/roles/in-memory/in-memory-role.repository';
import { Role, RoleSchema } from '../../../infrastructure/roles/mongoose/role.schema';
import { ExistsRoleByIdUseCase } from '../../../application/roles/usecases/exists-role.usecase';
import { UsersController } from './users.controller';
import { GetUserUseCase } from 'apps/auth-service/src/application/users/usecases/get-user.usecase';
import { DeleteUserUseCase } from 'apps/auth-service/src/application/users/usecases/delete-user.usecase';
import { UpdateUserUseCase } from 'apps/auth-service/src/application/users/usecases/update-user.usecase';
import { ExistsByEmailUseCase, ExistsByIdUseCase } from 'apps/auth-service/src/application/users/usecases/exists-user.usecase';
import { GetAllUsersUseCase } from 'apps/auth-service/src/application/users/usecases/get-all-users.usecase';
import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { RefreshTokenUseCase } from '../../../application/auth/usecases/refresh-token.usecase';
import { Argon2PasswordService } from '../../../infrastructure/auth/argon2-password.service';
import { JwtTokenService } from '../../../infrastructure/auth/jwt-token.service';

const useMongoose = !!process.env.DB_URI;

@Module({
  imports: [
    ...(useMongoose ? [MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema }
    ])] : []),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: useMongoose ? MongooseUserRepository : InMemoryUserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: useMongoose ? MongooseRoleRepository : InMemoryRoleRepository,
    },
    {
      provide: PASSWORD_SERVICE,
      useClass: Argon2PasswordService,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    { provide: ExistsRoleByIdUseCase, useFactory: (repo: any) => new ExistsRoleByIdUseCase(repo), inject: [ROLE_REPOSITORY] },
    { provide: CreateUserUseCase, useFactory: (repo: any, passwordService: any, existsRoleById: any) => new CreateUserUseCase(repo, passwordService, existsRoleById), inject: [USER_REPOSITORY, PASSWORD_SERVICE, ExistsRoleByIdUseCase] },
    { provide: GetUserUseCase, useFactory: (repo: any) => new GetUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: DeleteUserUseCase, useFactory: (repo: any) => new DeleteUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: UpdateUserUseCase, useFactory: (repo: any) => new UpdateUserUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: GetAllUsersUseCase, useFactory: (repo: any) => new GetAllUsersUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: ExistsByEmailUseCase, useFactory: (repo: any) => new ExistsByEmailUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: ExistsByIdUseCase, useFactory: (repo: any) => new ExistsByIdUseCase(repo), inject: [USER_REPOSITORY] },
    { provide: LoginUseCase, useFactory: (repo: any, passwordService: any, tokenService: any) => new LoginUseCase(repo, passwordService, tokenService), inject: [USER_REPOSITORY, PASSWORD_SERVICE, TOKEN_SERVICE] },
    { provide: RefreshTokenUseCase, useFactory: (repo: any, tokenService: any) => new RefreshTokenUseCase(repo, tokenService), inject: [USER_REPOSITORY, TOKEN_SERVICE] },
  ],
})
export class UsersHttpModule {}
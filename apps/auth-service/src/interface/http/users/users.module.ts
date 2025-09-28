import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from '../../../application/users/usecases/create-user.usecase';
import { USER_REPOSITORY } from '../../../application/tokens';
import { MongooseUserRepository } from '../../../infrastructure/users/mongoose/mongoose-user.repository';
import { InMemoryUserRepository } from '../../../infrastructure/users/in-memory/in-memory-user.repository';
import { User, UserSchema } from '../../../infrastructure/users/mongoose/user.schema';
import { UsersController } from './users.controller';

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
  ],
})
export class UsersHttpModule {}
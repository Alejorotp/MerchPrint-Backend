// users.controller.ts

import { CreateUserUseCase } from "../../../application/users/usecases/create-user.usecase";
import { toUserDTO  } from "../../../application/users/mappers/user.mapper";
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: { name: string; email: string; password: string; role: string }) {
    if (!body?.name || !body?.email || !body?.password || !body?.role) throw new Error('name, email, password and role are required');
    const user = await this.createUser.execute(body);
    return toUserDTO(user);
  }
}
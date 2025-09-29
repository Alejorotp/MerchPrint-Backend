// users.controller.ts

import { CreateUserUseCase } from "../../../application/users/usecases/create-user.usecase";
import { toUserDTO  } from "../../../application/users/mappers/user.mapper";
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../../../application/users/dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    const user = await this.createUser.execute(body);
    return toUserDTO(user);
  }
}
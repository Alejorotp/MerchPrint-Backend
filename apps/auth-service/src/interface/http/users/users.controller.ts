// users.controller.ts

import { toUserDTO  } from "../../../application/users/mappers/user.mapper";
import { Body, Controller, Post, Get, Delete, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '../../../application/users/dto/create-user.dto';
import { LoginDTO } from '../../../application/auth/dto/login.dto';
import { RefreshTokenDTO } from '../../../application/auth/dto/refresh-token.dto';
import { AuthResponseDTO } from '../../../application/auth/dto/auth-response.dto';

import { DeleteUserUseCase } from "apps/auth-service/src/application/users/usecases/delete-user.usecase";
import { UpdateUserUseCase } from "apps/auth-service/src/application/users/usecases/update-user.usecase";
import { GetAllUsersUseCase } from "apps/auth-service/src/application/users/usecases/get-all-users.usecase";
import { CreateUserUseCase } from "../../../application/users/usecases/create-user.usecase";
import { GetUserUseCase } from "../../../application/users/usecases/get-user.usecase";
import { ExistsByEmailUseCase, ExistsByIdUseCase } from "apps/auth-service/src/application/users/usecases/exists-user.usecase";
import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { RefreshTokenUseCase } from '../../../application/auth/usecases/refresh-token.usecase';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly existsUserByEmail: ExistsByEmailUseCase,
    private readonly existsUserById: ExistsByIdUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.', type: AuthResponseDTO })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() body: LoginDTO): Promise<AuthResponseDTO> {
    return this.loginUseCase.execute(body);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.', type: AuthResponseDTO })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  async refreshToken(@Body() body: RefreshTokenDTO): Promise<AuthResponseDTO> {
    return this.refreshTokenUseCase.execute(body);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() body: CreateUserDTO) {
    const user = await this.createUser.execute(body);
    return toUserDTO(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  async findById(@Param('id') id: string) {
    const user = await this.getUser.execute(id);
    if (!user) return null;
    return toUserDTO(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  async findAll() {
    const users = await this.getAllUsers.execute();
    return users.map(toUserDTO);
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(@Param('id') id: string) {
    await this.deleteUser.execute(id);
    return { message: 'User deleted successfully' };
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() body: Partial<CreateUserDTO>) {
    const updatedUser = await this.updateUser.execute(id, body);
    if (!updatedUser) return null;
    return toUserDTO(updatedUser);
  }
  @Get('exists/email/:email')
  @ApiOperation({ summary: 'Check if a user exists by email' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating if user exists.' })
  async existsByEmail(@Param('email') email: string): Promise<boolean> {
    return this.existsUserByEmail.execute(email);
  }
  @Get('exists/id/:id')
  @ApiOperation({ summary: 'Check if a user exists by id' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating if user exists.' })
  async existsById(@Param('id') id: string): Promise<boolean> {
    return this.existsUserById.execute(id);
  }
}
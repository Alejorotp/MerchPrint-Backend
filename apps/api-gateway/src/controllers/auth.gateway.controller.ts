import { Body, Controller, Post, Get, Delete, Put, Param, Inject, BadGatewayException, BadRequestException, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Req() req: Request, @Body() body: any) {
    try {
      const pattern = 'auth.login';
      console.debug('AuthGatewayController.login -> method:', req.method, 'url:', req.url);
      console.debug('AuthGatewayController.login -> headers:', req.headers);
      console.debug('AuthGatewayController.login -> sending pattern:', pattern, 'body:', body);

      if (body == null) {
        // Helpful error so client knows to send JSON with correct Content-Type
        throw new BadRequestException(
          'Missing request body. Ensure you send a JSON payload with `Content-Type: application/json`',
        );
      }

      const payload = body;
      const result = await firstValueFrom(this.authClient.send(pattern, payload));
      return result;
    } catch (error) {
      console.error('Microservice communication failed:', error);
      if (error instanceof BadRequestException) throw error;
      throw new BadGatewayException('Microservice communication failed');
    }
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  async refreshToken(@Body() body: any) {
    return firstValueFrom(this.authClient.send('auth.refreshToken', body));
  }

  @Post('users')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() body: any) {
    return firstValueFrom(this.authClient.send('auth.users.create', body));
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findUserById(@Param('id') id: string) {
    return firstValueFrom(this.authClient.send('auth.users.findById', id));
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  async findAllUsers() {
    return firstValueFrom(this.authClient.send('auth.users.findAll', {}));
  }

  @Delete('users/:id/delete')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    return firstValueFrom(this.authClient.send('auth.users.delete', id));
  }

  @Put('users/:id/update')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.authClient.send('auth.users.update', { id, body }),
    );
  }

  @Get('users/exists/email/:email')
  @ApiOperation({ summary: 'Check if a user exists by email' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating if user exists.' })
  async existsByEmail(@Param('email') email: string) {
    return firstValueFrom(
      this.authClient.send('auth.users.existsByEmail', email),
    );
  }

  @Get('users/exists/id/:id')
  @ApiOperation({ summary: 'Check if a user exists by id' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating if user exists.' })
  async existsById(@Param('id') id: string) {
    return firstValueFrom(this.authClient.send('auth.users.existsById', id));
  }

  @Post('roles')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'The role has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Role name already in use.' })
  async createRole(@Body() body: any) {
    return firstValueFrom(this.authClient.send('auth.roles.create', body));
  }

  @Get('roles')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles.' })
  async findAllRoles() {
    return firstValueFrom(this.authClient.send('auth.roles.findAll', {}));
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiResponse({ status: 200, description: 'Role found.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async findRoleById(@Param('id') id: string) {
    return firstValueFrom(this.authClient.send('auth.roles.findById', id));
  }

  @Put('roles/:id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({ status: 200, description: 'The role has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async updateRole(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(this.authClient.send('auth.roles.update', { id, body }));
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({ status: 204, description: 'The role has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async deleteRole(@Param('id') id: string) {
    return firstValueFrom(this.authClient.send('auth.roles.delete', id));
  }

  @Get('roles/exists/name/:name')
  @ApiOperation({ summary: 'Check if a role exists by name' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating if role exists.' })
  async roleExistsByName(@Param('name') name: string) {
    return firstValueFrom(this.authClient.send('auth.roles.existsByName', name));
  }

  @Get('roles/exists/id/:id')
  @ApiOperation({ summary: 'Check if a role exists by id' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating if role exists.' })
  async roleExistsById(@Param('id') id: string) {
    return firstValueFrom(this.authClient.send('auth.roles.existsById', id));
  }
}

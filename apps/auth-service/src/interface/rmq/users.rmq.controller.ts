import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUseCase } from '../../application/auth/usecases/login.usecase';
import { ExistsByEmailUseCase, ExistsByIdUseCase } from '../../application/users/usecases/exists-user.usecase';
import { LoginDTO } from '../../application/auth/dto/login.dto';
import { CreateUserUseCase } from '../../application/users/usecases/create-user.usecase';
import { GetUserUseCase } from '../../application/users/usecases/get-user.usecase';
import { DeleteUserUseCase } from '../../application/users/usecases/delete-user.usecase';
import { UpdateUserUseCase } from '../../application/users/usecases/update-user.usecase';
import { GetAllUsersUseCase } from '../../application/users/usecases/get-all-users.usecase';
import { RefreshTokenUseCase } from '../../application/auth/usecases/refresh-token.usecase';
import { CreateUserDTO } from '../../application/users/dto/create-user.dto';
import { toUserDTO } from '../../application/users/mappers/user.mapper';
import { RefreshTokenDTO } from '../../application/auth/dto/refresh-token.dto';
import { AuthResponseDTO } from '../../application/auth/dto/auth-response.dto';

@Controller()
export class UsersRmqController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly existsByEmail: ExistsByEmailUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly existsById: ExistsByIdUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @MessagePattern('auth.login')
  async login(@Payload() body: LoginDTO): Promise<AuthResponseDTO> {
    return this.loginUseCase.execute(body);
  }

  @MessagePattern('auth.refreshToken')
  async refreshToken(@Payload() body: RefreshTokenDTO) {
    return this.refreshTokenUseCase.execute(body);
  }

  @MessagePattern('auth.users.create')
  async create(@Payload() body: CreateUserDTO) {
    const user = await this.createUser.execute(body);
    return toUserDTO(user);
  }

  @MessagePattern('auth.users.findById')
  async findById(@Payload() id: string) {
    const user = await this.getUser.execute(id);
    if (!user) return null;
    return toUserDTO(user);
  }

  @MessagePattern('auth.users.findAll')
  async findAll() {
    const users = await this.getAllUsers.execute();
    return users.map(toUserDTO);
  }

  @MessagePattern('auth.users.delete')
  async delete(@Payload() id: string) {
    await this.deleteUser.execute(id);
    return { message: 'User deleted successfully' };
  }

  @MessagePattern('auth.users.update')
  async update(@Payload() data: { id: string; body: Partial<CreateUserDTO> }) {
    const updatedUser = await this.updateUser.execute(data.id, data.body);
    if (!updatedUser) return null;
    return toUserDTO(updatedUser);
  }

  @MessagePattern('auth.users.existsByEmail')
  async existsEmail(@Payload() email: string): Promise<boolean> {
    return this.existsByEmail.execute(email);
  }

  @MessagePattern('auth.users.existsById')
  async existsId(@Payload() id: string): Promise<boolean> {
    return this.existsById.execute(id);
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUseCase } from '../../application/auth/usecases/login.usecase';
import { ExistsByEmailUseCase } from '../../application/users/usecases/exists-user.usecase';
import { LoginDTO } from '../../application/auth/dto/login.dto';

@Controller()
export class UsersRmqController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly existsByEmail: ExistsByEmailUseCase,
  ) {}

  @MessagePattern('auth.login')
  async login(@Payload() body: LoginDTO) {
    return this.loginUseCase.execute(body);
  }

  @MessagePattern('auth.users.existsByEmail')
  async existsEmail(@Payload() email: string): Promise<boolean> {
    return this.existsByEmail.execute(email);
  }
}

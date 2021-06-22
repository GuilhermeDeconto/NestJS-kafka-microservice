import { Body, Controller, Logger, } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth-user')
  async index(@Body() req: any): Promise<User> {
    return await this.authService.validateUser(req.value);
  }

  @MessagePattern('auth-check')
  async loggedIn(@Body() data: any) : Promise<any> {
    try {
      const res = await this.authService.validateToken(data.value.jwt);
      return { valid: res.valid };
    } catch(e) {
      Logger.log(e);
      return { valid: false };
    }
  }
}

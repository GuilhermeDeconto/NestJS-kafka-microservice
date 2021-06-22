import { Logger, OnModuleInit } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientKafka } from "@nestjs/microservices";
import { compareSync } from "bcrypt";
import { UserDto } from "./dtos/user.dto";
import { User } from './entity/user.entity'

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
    private readonly jwtService: JwtService) {}

    async onModuleInit() {
      const requestPatterns = ['find-user-email'];
      
      requestPatterns.forEach(async pattern => {
          this.client.subscribeToResponseOf(pattern);
          await this.client.connect();
      });
  } 

  async validateUser(req: UserDto): Promise<User> {
    try {
      const user = await this.client.send('find-user-email', { email: req.email }).toPromise();
      if(compareSync(req.password, user?.password)) {
        return {
          name: user.name,
          email: user.email,
          accessToken : this.jwtService.sign(user)};
        };
      return null;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user : UserDto) {
    return {
      email: user.email,
      accessToken: this.jwtService.sign(user)
    };
  }

  async validateToken(jwt: string) {
    return await this.jwtService.verifyAsync(jwt).then(() => {
      return { valid: true };
    }).catch(() => {
      return { valid: false };
    });
  }
}
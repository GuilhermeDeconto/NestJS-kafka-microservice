import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { AuthService } from "./auth.service";

export class JwtStrategy extends PassportStrategy(Strategy,"auth") {
    constructor(configService: AuthService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'teste'
      });
    }
  
    async validate(payload) {
      return { id: payload.sub, user: payload.user};
    }
  }
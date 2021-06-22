import { CanActivate, ExecutionContext, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
    constructor(@Inject('AUTH_SERVICE') private client: ClientKafka) {}

    async onModuleInit() {
        const requestPatterns = ['auth-check'];
        
        requestPatterns.forEach(async pattern => {
            this.client.subscribeToResponseOf(pattern);
            await this.client.connect();
        });
    } 

    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      try{
        const res = await this.client.send('auth-check',{  jwt: req.headers['authorization']?.split(' ')[1]}).toPromise();
        if (res.valid != null && res.valid == true) {
            return true;
        }
        return false;
      } catch(err) {
        Logger.error(err);
        return false;
      }
    }
  }
import { Inject } from '@nestjs/common';
import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserDto } from './dtos/user.dto';
import { User } from './interfaces/user.interface';

@Controller('auth')
export class AuthenticationController implements OnModuleInit {
    // Inject kafka client
    constructor(@Inject('AUTH_SERVICE')private client: ClientKafka) {}
    
    async onModuleInit() {
        const requestPatterns = ['auth-user'];
        
        requestPatterns.forEach(async pattern => {
            this.client.subscribeToResponseOf(pattern);
            await this.client.connect();
        });
    } 
    
    @Post()
    encrypt(@Body() user: UserDto): Observable<User> {
        return this.client.send('auth-user', user);
    }
    
}
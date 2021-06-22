import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/guards/auth.guards';
import { UserDto } from './dtos/user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private client: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = ['find-all-user', 'find-user', 'create-user', 'update-user', 'delete-user', 'activate-user', 'inactivate-user'];
    requestPatterns.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  } 

  @Get()
  @UseGuards(AuthGuard)
  index(): Observable<User[]> {
    return this.client.send('find-all-user', {});
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  find(@Param('id') id: number): Observable<User> {
    return this.client.send('find-user', {id})
  }

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): Observable<User> {
    return this.client.send('create-user', user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBody({ type: UserDto })
  update(@Param('id') id: number, @Body() { name, email, phone, password }: UserDto) {
    const payload = {
      id,
      name,
      email,
      phone,
      password,
    };

    return this.client.emit('update-user', payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.client.emit('delete-user', {id})
  }

  @Patch(':id/activate')
  @UseGuards(AuthGuard)
  activate(@Param('id') id: number) {
    return this.client.emit('activate-user', {id});
  }

  @Patch(':id/inactivate')
  @UseGuards(AuthGuard)
  inactivate(@Param('id') id: number) {
    return this.client.emit('inactivate-user', {id});
  }

}
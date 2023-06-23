import { Controller, Get, Post, Request, UseGuards, Inject } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth/jwt-auth.guard';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    @Inject('EMAIL_SERVICE') private client: ClientProxy
    ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('send-message')
  sendMessage(@Request() req) {
    this.client.send({
      cmd: 'send-mail'
    }, 'hola mundo').subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
    return "ok";
  }
}

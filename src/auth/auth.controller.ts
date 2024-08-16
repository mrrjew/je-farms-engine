import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: Request) {
    try{
      const user = req['user'];
    console.log(user)
    return user;
    }catch(error){
      console.log(error)
    }
  }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}



import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuard(JwtAuthGuard)
  profile(@Req() req: Request) {
    const user = req['user'];
    return user;
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
function UseGuard(AuthGuard: any): (target: AuthController, propertyKey: "profile", descriptor: TypedPropertyDescriptor<(req: Request) => Express.User>) => void | TypedPropertyDescriptor<...> {
  throw new Error('Function not implemented.');
}

